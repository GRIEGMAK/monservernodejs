const express = require('express');
const compression = require('compression')
require('dotenv').config();
const authRouter = require('./authRouter')
// const sequelize = require('./db')
var https = require('https');
const mysql = require("mysql2");

const app = express();

const PORT = process.env.PORT || 57989;

app.use(express.static("public"));
app.use(express.json())
app.use("/auth", authRouter);


const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "db_1_info",
});

connection.connect(function(err){
  if (err) {
    return console.error("Ошибка: " + err.message);
  }
  else{
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});

connection.end(function(err) {
  if (err) {
    return console.log("Ошибка: " + err.message);
  }
  console.log("Подключение закрыто");
});


app.use(compression()); 

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + '/public'));

app.use(express.static(`${__dirname}/app/views`));

app.set("view engine", "ejs");
app.set("views", "./views");

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

const start = async () => {
    try {
        app.listen(PORT, () => {console.log(`server started on port: ${PORT}`);});
    } catch (e) { console.log(e);}
};


start()



app.get("/", function(req, res) {
    res.render("homePage");
});



app.get("/test", function(req, res) {
    res.render("testPage");
});