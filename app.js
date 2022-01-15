const express = require('express');
const compression = require('compression')
require('dotenv').config();
const authRouter = require('./authRouter')
const path = require('path');
// const sequelize = require('./db')
var https = require('https');
const mysql = require("mysql2");
var favicon = require('serve-favicon');

const app = express();

const PORT = process.env.PORT || 5000;

// app.use(favicon(__dirname + '/public/images/favicon.png'));
const faviconPath = path.join(__dirname, 'public/images/favicon.png')

app.use(favicon(faviconPath));
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

app.get("/index.html", function(req, res) {
    res.render("homePage");
});

app.get("/politika-konfidencialnosti/", function(req, res) {
  res.render("politika-konfidencialnosti");
});


app.get("/register.html", function(req, res) {
    res.render("register");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.get("/client/dashboard", function(req, res) {
  res.render("client");
});

app.get("/client/dashboard.html", function(req, res) {
  res.render("client");
});

app.get("/client/products.html", function(req, res) {
  res.render("products");
});

app.get("/client/products", function(req, res) {
  res.render("products");
});

app.get("/client/categories.html", function(req, res) {
  res.render("categories");
});

app.get("/client/categories", function(req, res) {
  res.render("categories");
});

app.get("/client/sellers.html", function(req, res) {
  res.render("sellers");
});

app.get("/client/sellers", function(req, res) {
  res.render("sellers");
});

app.get("/client/brands.html", function(req, res) {
  res.render("brands");
});

app.get("/client/brands", function(req, res) {
  res.render("brands");
});

app.get("/client/keywords.html", function(req, res) {
  res.render("keywords");
});

app.get("/client/keywords", function(req, res) {
  res.render("keywords");
});

app.get("/client/analytic.html", function(req, res) {
  res.render("analytic");
});

app.get("/client/analytic", function(req, res) {
  res.render("analytic");
});

app.get("/client/market.html", function(req, res) {
  res.render("market");
});

app.get("/client/market", function(req, res) {
  res.render("market");
});

app.get("/client/store/main.html", function(req, res) {
  res.render("main");
});

app.get("/client/store/main", function(req, res) {
  res.render("main");
});

app.get("/client/lists.html", function(req, res) {
  res.render("lists");
});

app.get("/client/lists", function(req, res) {
  res.render("lists");
});

app.get("/client/rates.html", function(req, res) {
  res.render("rates");
});

app.get("/client/rates", function(req, res) {
  res.render("rates");
});

app.get("/client/partner.html", function(req, res) {
  res.render("partner");
});

app.get("/client/partner", function(req, res) {
  res.render("partner");
});

app.get("/client/user.html", function(req, res) {
  res.render("user");
});

app.get("/client/user", function(req, res) {
  res.render("user");
});

app.get("/client/faq.html", function(req, res) {
  res.render("faq");
});

app.get("/client/faq", function(req, res) {
  res.render("faq");
});
