const bloglistRouter = require("express").Router();
const Blog = require("../models/bloglist");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

bloglistRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", {
		username: 1,
		name: 1,
	});
	response.json(blogs);
});

bloglistRouter.post("/", async (request, response) => {
	const body = request.body;
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "token invalid" });
	}
	const user = await User.findById(decodedToken.id);

	if (!user) {
		return response.status(400).json({ error: "userId missing or not valid" });
	}

	const blog = new Blog({
		title: body.title,
		author: user._id,
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

bloglistRouter.delete("/:id", async (request, response, next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "token invalid" });
	}

	try {
		const blog = await Blog.findById(request.params.id);

		const userId = decodedToken.id;
		if (blog.user.toString() === userId.toString()) {
			await Blog.findByIdAndDelete(request.params.id);
			return response.status(204).end();
		} else {
			return response.status(401).json({ error: "Invalid user" });
		}
	} catch (exception) {
		next(exception);
	}
});

bloglistRouter.put("/:id", async (request, response, next) => {
	try {
		const { likes } = request.body;

		const blog = await Blog.findById(request.params.id);
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
