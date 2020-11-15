const button3000 = document.getElementById('3000');
const button3001 = document.getElementById('3001');
const button3001cors = document.getElementById('3001-cors');
const input = document.getElementById('input');
const display = document.getElementById('display');

const handleFetch = (port, endpoint) =>
  fetch(`http://localhost:${port}${endpoint}`, {
    body: JSON.stringify({ value: input.value }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (res.ok) return res.json();

    return res.json().then(err => {
      console.error(`err in fetch:`, err);
      return err.response.data;
    });
  });

const handleClick = (port, endpoint) => {
  return handleFetch(port, endpoint)
    .then(res => {
      display.style.color = 'black';
      display.textContent = JSON.stringify(res, null, 2);
    })
    .catch(err => {
      console.error(err);
      display.style.color = 'red';
      display.textContent = JSON.stringify(err.message, null, 2);
    });
};

button3000.onclick = () => handleClick('3000', '/api');
button3001.onclick = () => handleClick('3001', '/api');
button3001cors.onclick = () => handleClick('3001', '/api_cors');
