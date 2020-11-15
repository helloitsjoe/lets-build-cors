exports.noop = (req, res, next) => next();

exports.simpleCors = (req, res, next) => {
  console.log(`res:`, res);
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('X-My-Personal-Header', 'You are great');
  next();
};

// Handler for all POST requests
exports.postHandler = (req, res) => {
  const { body, headers: reqHeaders } = req;
  const resHeaders = res.getHeaders();
  res.json({ message: 'Welcome!', body, reqHeaders, resHeaders });
};
