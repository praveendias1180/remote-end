require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || process.env.C_PORT
var nodemailer = require('nodemailer');

app.use(cors());

/**
 * create application/json parser
 */
var jsonParser = bodyParser.json()
 
/**
 * create application/x-www-form-urlencoded parser
 */
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const remote_welcome = '<h1>Welcome to WP Remote</h1> ';

app.get("/", (req, res) => {
  res.json('Nothing Here.');
});

app.get("/api/v1/", (req, res) => {
  res.json('Nothing Here.');
});

app.post("/api/v1", urlencodedParser, (req, res) => {
    res.send( remote_welcome + ' fname: ' + req.body.fname + ' | fdata: ' + req.body.fdata)
});

app.post("/api/v2", urlencodedParser, (req, res) => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
      }
    });

    var mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: process.env.TO_EMAIL,
      subject: 'POST - Node.js Test Suit',
      text: JSON.stringify(req.body)
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.send( JSON.stringify(req.body))
});

app.get("/api/v2", urlencodedParser, (req, res) => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
      }
    });

    var mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: process.env.TO_EMAIL,
      subject: 'GET - Node.js Test Suit',
      text: JSON.stringify(req.body)
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.send( JSON.stringify(req.body))
});

app.patch("/api/v1", (req, res) => {
  res.json('Hi, there');
});

app.listen(PORT, () => {
  console.log(`Node server started on port ${ PORT }.`);
});