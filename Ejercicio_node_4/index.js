const https = require('https');

const options = {
  hostname: 'www.ocasionplus.com',
  port: 443,
  path: '/',
  method: 'GET',
};

let html = '';

const req = https.request(options, (res) => {
    res.on('data', (chunk) => {
        html += chunk;
    })
    res.on('end', () => {
        procesarHTML(html);
    })
});

req.on('error', (error) => {
  console.log(`Error: ${error}`);
});

req.end();

function procesarHTML(html){
    
    return 
}
