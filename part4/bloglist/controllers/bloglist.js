const bloglistRouter = require('express').Router();
const Blog = require("../models/bloglist");

bloglistRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

bloglistRouter.post("/", async (request, response) => {
	const blog = new Blog(request.body);

    const result = await blog.save();
    response.status(201).json(result);
});

module.exports = bloglistRouter;