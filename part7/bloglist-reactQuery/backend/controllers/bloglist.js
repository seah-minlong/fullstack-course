const bloglistRouter = require("express").Router();
const Blog = require("../models/bloglist");
const { userExtractor } = require("../utils/middleware");

bloglistRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", {
		username: 1, // 1 means include this field
		name: 1,
	});
	response.json(blogs);
});

bloglistRouter.post("/", userExtractor, async (request, response) => {
	const body = request.body;
	const user = request.user;

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id,
	});

	const result = await blog.save();
	user.blogs = user.blogs.concat(result.id);
	await user.save();

	response.status(201).json(result);
});

bloglistRouter.get(`/:id`, async (request, response, next) => {
	try {
		const blog = await Blog.findById(request.params.id);
		if (blog) {
			response.json(blog);
		} else {
			response.status(404).end();
		}
	} catch (exception) {
		next(exception);
	}
});

bloglistRouter.delete(
	"/:id",
	userExtractor,
	async (request, response, next) => {
		try {
			const blog = await Blog.findById(request.params.id);
			if (!blog) {
				response.status(404).end();
			}

			const userId = request.user.id;
			if (blog.user.toString() === userId.toString()) {
				await Blog.findByIdAndDelete(request.params.id);
				response.status(204).end();
			} else {
				response.status(401).json({ error: "Invalid user" });
			}
		} catch (exception) {
			next(exception);
		}
	}
);

bloglistRouter.put("/:id", async (request, response, next) => {
	try {
		const { likes } = request.body;

		const blog = await Blog.findById(request.params.id).populate("user", {
			username: 1, // 1 means include this field
			name: 1,
		});

		if (blog) {
			blog.likes = likes;

			const result = await blog.save();
			response.json(result);
		} else {
			response.status(404).end();
		}
	} catch (exception) {
		next(exception);
	}
});

module.exports = bloglistRouter;
