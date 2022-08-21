const express = require('express');
const cors = require('cors');
const {
  postHandler,
  proxyHandler,
  portMiddleware,
  noop,
  simpleCors,
} = require('./middleware');

const corsOptions = { origin: 'http://localhost:3000' };

const makeApp = (port, serveFrontend) => {
  const app = express();

  // Serve index.html/js
  app.use(serveFrontend ? noop : express.static(__dirname));

  // Parse body in POST requests
  app.use(express.json());

  // Add port to request
  app.use(portMiddleware(port));

  // No CORS protection on OPTIONS (pre-POST) requests just to
  // make the POST requests more obvious what's happening
  app.options('*', cors());

  // No CORS, this will only respond to requests from the same domain (port)
  app.post('/api', postHandler);

  // This will respond to cross-origin requests that match corsOptions
  app.post('/api_cors', cors(corsOptions), postHandler);

  // Simple CORS without cors library (replace cors() with this to use it)
  // app.post('/api_cors', simpleCors, postHandler);
  // Proxy to get around CORS
  app.post('/api_proxy', simpleCors(), proxyHandler);

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
// Visit localhost:3002 and make a request to 3001 with corsOptions.origin = true
// Now change corsOptions.origin = 'http://localhost:3000' and make a request
// from 3000, and then one from 3002. See the difference?
makeApp(3002, true);
