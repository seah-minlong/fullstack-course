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

bloglistRouter.get(`/:id`, async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog);
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})

module.exports = bloglistRouter;