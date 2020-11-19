const axios = require('axios');

exports.noop = (req, res, next) => next();

exports.simpleCors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('X-My-Personal-Header', 'You are great');
  next();
};

exports.portMiddleware = port => (req, res, next) => {
  req.port = port;
  next();
};

// Handler for all POST requests
exports.postHandler = (req, res) => {
  const { body, headers: reqHeaders, port } = req;
  const resHeaders = res.getHeaders();
  res.json({ message: `Hello from ${port}!`, body, reqHeaders, resHeaders });
};

// Proxy requests to other domain
exports.proxyHandler = async (req, res) => {
  const response = await axios.post('http://localhost:3001/api', req.body, {
    headers: { ...req.headers, 'X-Proxied': 'Yup' },
  });
  res.json(response.data);
};
