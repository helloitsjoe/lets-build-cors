const express = require('express');

const makeApp = (port = 3000) => {
  const app = express();

  app.use(express.static('static'));
  app.use(express.json());

  app.listen(port, () => {
    console.log('Serving UI on http://localhost:3000');
  });
};

module.exports = {
  makeApp,
};
