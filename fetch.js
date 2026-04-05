const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const fs = require('fs');
    fs.writeFileSync('temp_page.html', data);
    console.log('done');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
