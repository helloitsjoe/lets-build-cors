const express = require('express');

const makeApp = (port = 3000) => {
  const app = express();

  app.use(express.static('public'));
  app.use(express.json());

  app.post('/api', (req, res) => {
    res.status(200).json({ message: `${req.body.value} right back!` });
  });

  app.listen(port, () => {
    console.log('Listening on http://localhost:3000');
  });
};

module.exports = {
  makeApp,
};
