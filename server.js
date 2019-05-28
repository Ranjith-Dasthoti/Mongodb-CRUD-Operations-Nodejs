const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
const Data = require("./database/schema");
const uuid = require("uuid");

mongoose
  .connect(
    "mongodb+srv://<username>:<password>@practicecluster-2b9h7.mongodb.net/userdata?retryWrites=true",
    {
      useNewUrlParser: true
    }
  )
  .then(result => {
    console.log("connected to mongo server");
    app.listen("3000");
  });

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/register", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.post("/register/save", (req, res, next) => {
  let data = new Data(req.body);
  data._id = uuid();
  data.createdAt = new Date();
  data.save().then(() => {
    console.log("data saved");
    res.redirect("/login");
  });
});

app.get("/login", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.post("/login/authentication", (req, res, next) => {
  Data.findOne(
    { name: req.body.name, password: req.body.password },
    (err, result) => {
      if (result) {
        console.log(result);
        res.render("loggedin", { createdAt: result.createdAt });
      }
    }
  );

  //   if (data) {
  //     console.log("loggedin");
  //   } else console.log("somewhere problem");
});
app.get("/getdata", (req, res, next) => {
  Data.find((err, list) => {
    if (err) console.log(err);
    else console.log(list);
  });
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});
