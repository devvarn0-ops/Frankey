import os, time, hashlib, secrets
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from urllib.request import Request, urlopen
import json

# Persistent storage is intentionally delegated to Supabase REST.
# Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel.
# Never expose the service-role key to frontend/browser code.

SUPABASE_URL = os.getenv("SUPABASE_URL", "").rstrip("/")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "")
UPSTREAM = os.getenv("IPINFO_UPSTREAM", "https://ipwho.is/{ip}")

def sb_request(method, table, params=None, payload=None):
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise RuntimeError("Supabase environment variables are not configured.")
    url = f"{SUPABASE_URL}/rest/v1/{table}"
    if params:
        from urllib.parse import urlencode
        url += "?" + urlencode(params, doseq=True)
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    }
    data = None if payload is None else json.dumps(payload).encode()
    req = Request(url, data=data, headers=headers, method=method)
    with urlopen(req, timeout=12) as r:
        body = r.read().decode()
        return json.loads(body) if body else []

def json_response(handler, status, obj):
    body = json.dumps(obj, ensure_ascii=False).encode()
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Cache-Control", "no-store")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)

def client_ip(handler):
    # For public IP lookup, trust Vercel's forwarded header.
    # The user may also pass ?ip=... for looking up another public IP.
    return (handler.headers.get("x-forwarded-for", "").split(",")[0].strip()
            or handler.headers.get("x-real-ip", "").strip()
            or "unknown")

def valid_ip(ip):
    import ipaddress
    try:
        obj = ipaddress.ip_address(ip)
        return not (obj.is_private or obj.is_loopback or obj.is_link_local or obj.is_reserved)
    except Exception:
        return False

def lookup_ip(ip):
    url = UPSTREAM.replace("{ip}", ip)
    req = Request(url, headers={"User-Agent": "ORISS-IPInfo/1.0"})
    with urlopen(req, timeout=8) as r:
        raw = json.loads(r.read().decode())
    # Normalize common ipwho.is-style response.
    if isinstance(raw, dict) and raw.get("success") is False:
        raise ValueError(raw.get("message", "Lookup failed"))
    return {
        "ip": raw.get("ip", ip),
        "success": raw.get("success", True),
        "type": raw.get("type"),
        "continent": raw.get("continent"),
        "country": raw.get("country"),
        "country_code": raw.get("country_code"),
        "region": raw.get("region"),
        "city": raw.get("city"),
        "postal": raw.get("postal"),
        "latitude": raw.get("latitude"),
        "longitude": raw.get("longitude"),
        "timezone": (raw.get("timezone") or {}).get("id") if isinstance(raw.get("timezone"), dict) else raw.get("timezone"),
        "currency": (raw.get("currency") or {}).get("code") if isinstance(raw.get("currency"), dict) else raw.get("currency"),
        "connection": raw.get("connection"),
        "isp": (raw.get("connection") or {}).get("isp") if isinstance(raw.get("connection"), dict) else raw.get("isp"),
        "organization": (raw.get("connection") or {}).get("org") if isinstance(raw.get("connection"), dict) else raw.get("organization"),
        "asn": (raw.get("connection") or {}).get("asn") if isinstance(raw.get("connection"), dict) else raw.get("asn"),
        "source": "configured-upstream"
    }

def hash_key(key):
    return hashlib.sha256(key.encode()).hexdigest()

def auth_key(key):
    if not key:
        return None
    rows = sb_request("GET", "api_keys", {
        "select": "id,key_hash,name,credits,active",
        "key_hash": f"eq.{hash_key(key)}",
        "limit": "1"
    })
    return rows[0] if rows else None

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args): pass

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        qs = parse_qs(parsed.query)

        if path in ("/", "/api"):
            return json_response(self, 200, {
                "name": "ORISS IPInfo API",
                "version": "1.0.0",
                "developer": "@Oriss01",
                "channel": "https://t.me/Digittalphantom",
                "endpoints": {
                    "current": "/api/ip?key=YOUR_KEY",
                    "lookup": "/api/ip/8.8.8.8?key=YOUR_KEY",
                    "balance": "/api/balance?key=YOUR_KEY"
                }
            })

        if path == "/api/ip":
            key = qs.get("key", [None])[0]
            ip = qs.get("ip", [client_ip(self)])[0]
            return self.handle_lookup(key, ip)

        if path.startswith("/api/ip/"):
            key = qs.get("key", [None])[0]
            ip = path.split("/api/ip/", 1)[1].strip()
            return self.handle_lookup(key, ip)

        if path == "/api/balance":
            key = qs.get("key", [None])[0]
            row = auth_key(key)
            if not row:
                return json_response(self, 401, {"success": False, "error": "Invalid API key"})
            return json_response(self, 200, {
                "success": True,
                "credits": row["credits"],
                "active": row["active"],
                "key_name": row["name"]
            })

        if path == "/health":
            return json_response(self, 200, {"success": True, "status": "online", "service": "ORISS IPInfo API"})

        return json_response(self, 404, {"success": False, "error": "Endpoint not found"})

    def handle_lookup(self, key, ip):
        row = auth_key(key)
        if not row:
            return json_response(self, 401, {"success": False, "error": "Invalid API key"})
        if not row["active"]:
            return json_response(self, 403, {"success": False, "error": "API key disabled"})
        if int(row["credits"]) <= 0:
            return json_response(self, 402, {"success": False, "error": "Insufficient credits"})
        if not valid_ip(ip):
            return json_response(self, 400, {"success": False, "error": "Only valid public IP addresses are allowed"})
        try:
            result = lookup_ip(ip)
            # Consume exactly one credit after a successful upstream lookup.
            sb_request("PATCH", "api_keys", {"id": f"eq.{row['id']}"}, {"credits": int(row["credits"]) - 1, "updated_at": "now()"})
            result["credits_remaining"] = int(row["credits"]) - 1
            return json_response(self, 200, {"success": True, "data": result})
        except Exception as e:
            return json_response(self, 502, {"success": False, "error": "Upstream lookup failed"})

def admin_create_key(name, credits):
    raw = "ORISS-" + secrets.token_urlsafe(24).replace("-", "").replace("_", "")[:32]
    sb_request("POST", "api_keys", payload={
        "key_hash": hash_key(raw), "name": name, "credits": int(credits), "active": True
    })
    return raw

def main_admin(event):
    # Kept for reference; admin UI is served separately by /admin in the static frontend.
    pass

# Vercel's Python runtime accepts a BaseHTTPRequestHandler class as the exported handler.
handler = Handler
