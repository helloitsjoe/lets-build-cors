const express = require('express');

const makeApi = (port = 3001) => {
  const app = express();

  app.use(express.json());

  app.post('/api', (req, res) => {
    res
      .status(200)
      .json({ message: `${req.body.message} right back from the API!` });
  });

  app.listen(port, () => {
    console.log(`Serving API on http://localhost:${port}`);
  });
};

module.exports = {
  makeApi,
};
