const express = require('express');

const makeApi = (port = 3000) => {
  const app = express();

  app.use(express.json());

  app.options('*', (req, res) => {
    console.log('huh');
    res.header('Access-Control-Allow-Origin', '*');
    res.send('OK');
  });

  app.post('/api', (req, res) => {
    console.log('post');
    res.header('Access-Control-Allow-Origin', '*');
    res
      .status(200)
      .json({ message: `${req.body.value} right back from App two!` });
  });

  app.listen(port, () => {
    console.log(`Serving API on http://localhost:${port}`);
  });
};

module.exports = {
  makeApi,
};
