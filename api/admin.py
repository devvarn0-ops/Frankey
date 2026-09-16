# Optional admin serverless endpoint to pair with admin.html.
import os, json, hashlib, secrets
from http.server import BaseHTTPRequestHandler
from urllib.request import Request, urlopen

SUPABASE_URL = os.getenv("SUPABASE_URL", "").rstrip("/")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "")

def sb_post(payload):
    body = json.dumps(payload).encode()
    req = Request(
        f"{SUPABASE_URL}/rest/v1/api_keys",
        data=body,
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        },
        method="POST"
    )
    with urlopen(req, timeout=10) as r:
        return json.loads(r.read().decode())

def sha(x): return hashlib.sha256(x.encode()).hexdigest()

class Handler(BaseHTTPRequestHandler):
    def log_message(self,*a): pass
    def do_POST(self):
        if self.path != "/api/admin/create":
            return self.out(404, {"success":False,"error":"Not found"})
        if self.headers.get("x-admin-token","") != ADMIN_TOKEN:
            return self.out(401, {"success":False,"error":"Unauthorized"})
        try:
            n=int(self.headers.get("content-length","0"))
            data=json.loads(self.rfile.read(n) or b"{}")
            name=str(data.get("name") or "Customer")[:100]
            credits=int(data.get("credits") or 0)
            if credits < 1: raise ValueError()
            raw="ORISS-"+secrets.token_urlsafe(24).replace("-","").replace("_","")[:32]
            sb_post({"key_hash":sha(raw),"name":name,"credits":credits,"active":True})
            return self.out(200, {"success":True,"api_key":raw,"name":name,"credits":credits})
        except Exception:
            return self.out(400, {"success":False,"error":"Invalid request"})
    def out(self,status,obj):
        b=json.dumps(obj).encode(); self.send_response(status)
        self.send_header("Content-Type","application/json"); self.send_header("Content-Length",str(len(b)))
        self.end_headers(); self.wfile.write(b)
handler=Handler
