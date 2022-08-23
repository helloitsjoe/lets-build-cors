const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Simplified version of what the 'cors' library is doing
const simpleCors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('X-My-Personal-Header', 'You are great');
  next();
};

// Handler for all POST requests
const postHandler = (port) => (req, res) => {
  const { body, headers: reqHeaders } = req;
  const resHeaders = res.getHeaders();
  res.json({ message: `Hello from ${port}!`, body, reqHeaders, resHeaders });
};

const makeApp = (port, serveFrontend) => {
  const app = express();

  if (serveFrontend) {
    // Serve index.html/js
    app.use(express.static('public'));
  }

  // Parse body in POST requests
  app.use(express.json());

  // No CORS protection on OPTIONS (pre-POST) requests just to
  // make the POST requests more obvious what's happening
  app.options('*', cors());

  // No CORS, this will only respond to requests from the same origin (port)
  app.post('/api', postHandler(port));

  // This will respond to all cross-origin requests
  app.post('/api_cors_true', cors({ origin: true }), postHandler(port));

  // This will respond only to cross-origin requests that match localhost:3000
  app.post(
    '/api_cors_3000',
    cors({ origin: 'http://localhost:3000' }),
    postHandler(port)
  );

  // Simple CORS without cors library (replace cors() with this to use it)
  app.post('/api_cors_simple', simpleCors, postHandler(port));

  // Proxy to get around CORS
  app.post('/api_proxy', async (req, res) => {
    const response = await axios.post('http://localhost:3001/api', req.body, {
      headers: { ...req.headers, 'X-Proxied': 'Yup' },
    });
    res.json(response.data);
  });

  app.listen(port, () => {
    console.log(
      `listening on http://localhost:${port} ${
        serveFrontend ? '(With UI)' : ''
      }`
    );
  });
};

makeApp(3000, true);
makeApp(3001);
// Visit localhost:3002 and make requests. Which endpoints allow the request?
makeApp(3002, true);
