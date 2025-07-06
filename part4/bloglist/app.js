const config = require("./utils/config");
const bloglistRouter = require("./controllers/bloglist");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(express.json());

app.use("/api/blogs", bloglistRouter);

module.exports = app;