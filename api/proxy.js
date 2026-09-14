const axios = require('axios');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = req.query.url;
  const path = req.query.path || 'clients';

  if (!url) {
    return res.status(400).json({ success: false, error: 'Missing url parameter' });
  }

  try {
    const cleanUrl = url.replace(/\/$/, '');
    const firebaseUrl = cleanUrl + '/' + path + '.json';
    const response = await axios.get(firebaseUrl, {
      timeout: 10000,
      headers: { 'Accept': 'application/json' }
    });
    return res.status(200).json({ success: true, data: response.data || {} });
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        error: 'Firebase returned ' + error.response.status,
        data: null
      });
    }
    return res.status(500).json({ success: false, error: error.message, data: null });
  }
};