const express = require('express');
const app = express();
const cors = require('cors');
const GrowXrouter = require('./Src/GrowXRoutes/AllGrowXRoutes');
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Allow all origins for demonstration purposes

app.use("/image", express.static(__dirname + "/public/image"));

app.use("/auth", GrowXrouter);



module.exports = app;
