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

const PORT = process.env.PORT || 57989;

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

// app.use(express.static(`${__dirname}/app/views`));

app.set("view engine", "html");
app.engine('html', require('ejs').renderFile);
app.set("views", __dirname + "/public/client/");


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
    res.sendfile("public/index.html");
});

app.get("/index.html", function(req, res) {
    res.sendfile("public/index.html");
});

app.get("/politika-konfidencialnosti/", function(req, res) {
  res.sendfile("politika-konfidencialnosti");
});


app.get("/register.html", function(req, res) {
    res.sendfile("public/register.html");
});

app.get("/register", function(req, res) {
  res.sendfile("public/register.html");
});

app.get("/client/dashboard", function(req, res) {
  res.sendfile("public/client/dashboard.html");
});

app.get("/client/dashboard.html", function(req, res) {
  res.sendfile("public/client/dashboard.html");
});

app.get("/client/products.html", function(req, res) {
  res.sendfile("public/client/products.html");
});

app.get("/client/products", function(req, res) {
  res.sendfile("public/client/products.html");
});

app.get("/client/undefined.html", function(req, res) {
  res.sendfile("public/client/undefined.html");
});

app.get("/client/undefined", function(req, res) {
  res.sendfile("public/client/undefined.html");
});

app.get("/client/categories.html", function(req, res) {
  res.sendfile("public/client/categories.html");
});

app.get("/client/categories", function(req, res) {
  res.sendfile("public/client/categories.html");
});

app.get("/client/sellers.html", function(req, res) {
  res.sendfile("public/client/sellers.html");
});

app.get("/client/sellers", function(req, res) {
  res.sendfile("public/client/sellers.html");
});

app.get("/client/brands.html", function(req, res) {
  res.sendfile("public/client/brands.html");
});

app.get("/client/brands", function(req, res) {
  res.sendfile("public/client/brands.html");
});

app.get("/client/keywords.html", function(req, res) {
  res.sendfile("public/client/keywords.html");
});

app.get("/client/keywords", function(req, res) {
  res.sendfile("public/client/keywords.html");
});

app.get("/client/analytic.html", function(req, res) {
  res.sendfile("public/client/analytic.html");
});

app.get("/client/analytic", function(req, res) {
  res.sendfile("public/client/analytic.html");
});

app.get("/client/market.html", function(req, res) {
  res.sendfile("public/client/market.html");
});

app.get("/client/market", function(req, res) {
  res.sendfile("public/client/market.html");
});

app.get("/client/store/main.html", function(req, res) {
  res.sendfile("public/client/main.html");
});

app.get("/client/store/main", function(req, res) {
  res.sendfile("public/client/main.html");
});

app.get("/client/lists.html", function(req, res) {
  res.sendfile("public/client/lists.html");
});

app.get("/client/lists", function(req, res) {
  res.sendfile("public/client/lists.html");
});

app.get("/client/rates.html", function(req, res) {
  res.sendfile("public/client/rates.html");
});

app.get("/client/rates", function(req, res) {
  res.sendfile("public/client/rates.html");
});

app.get("/client/partner.html", function(req, res) {
  res.sendfile("public/client/partner.html");
});

app.get("/client/partner", function(req, res) {
  res.sendfile("public/client/partner.html");
});


app.get("/client/user.html", function(req, res) {
  res.sendfile("public/client/user.html");
});

app.get("/client/user", function(req, res) {
  res.sendfile("public/client/user.html");
});

app.get("/client/faq.html", function(req, res) {
  res.sendfile("public/client/faq.html");
});

app.get("/client/faq", function(req, res) {
  res.sendfile("public/client/faq.html");
});

app.get("/client/bonus.html", function(req, res) {
  res.sendfile("public/client/bonus.html");
});

app.get("/client/bonus", function(req, res) {
  res.sendfile("public/client/bonus.html");
});

app.get("/client/template/bonus", function(req, res) {
  res.sendfile("public/client/template/bonus.html");
});
