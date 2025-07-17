const config = require("./utils/config");
const bloglistRouter = require("./controllers/bloglist");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const app = express();

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info("connected to MongoDB");
	})
	.catch((error) => {
		logger.error("error connection to MongoDB:", error.message);
	});

app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", bloglistRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;