const express = require('express');
require('dotenv').config();
const authRouter = require('./authRouter')
const sequelize = require('./db')

const app = express();

const PORT = process.env.PORT || 5000;
const conString = "postgres://nodejs_user:mypassword1234@localhost:5432/db_1";

app.use(express.static("public"));
app.use(express.json())
app.use("/auth", authRouter);


app.set("view engine", "ejs");
app.set("views", "./views");

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
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