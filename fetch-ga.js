const http = require('http');

http.get('http://localhost:3001', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    if (data.includes('G-DUMMY12345')) {
      console.log('SUCCESS: G-DUMMY12345 found in the DOM.');
    } else {
      console.log('FAILURE: G-DUMMY12345 NOT found in the DOM.');
      console.log('Snippets containing G-:');
      const lines = data.split('>');
      lines.forEach(l => {
        if (l.includes('G-')) console.log(l + '>');
      });
    }
  });
}).on('error', (err) => {
  console.error('Error fetching page:', err.message);
});
