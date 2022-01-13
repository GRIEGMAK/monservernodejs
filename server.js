const http = require('http');
 
const app = http.createServer();
 
var https = require('https');
var fs = require('fs');
 
var options = {
  'method': 'GET',
  'hostname': 'api.moneyplace.io',
  'path': '/v1/product?q[mp][equal]=ozon&q[sku][equal]=165117234',
  'headers': {
    'Authorization': 'Token KVH4BEN445DZ47WE',
    'Content-Type': 'application/json'
  },
  'maxRedirects': 20
};
 
var req = https.request(options, function (res) {
  var chunks = [];
 
  res.on("data", function (chunk) {
    chunks.push(chunk);
  });
 
  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
 
  res.on("error", function (error) {
    console.error(error);
  });
});
 
var postData = JSON.stringify({"startRow":0,"endRow":100,"filterModel":{},"sortModel":[{"colId":"revenue","sort":"desc"}]});
 
req.write(postData);
 
req.end();
 
app.on('request', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html'})
    res.end(`Привет happy hacking`);
 
});
 
app.listen(5000, () => console.log('Сервер работает'));