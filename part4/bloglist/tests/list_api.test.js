const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/bloglist");

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(helper.initialBlog);
});

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
	const response = await api.get("/api/blogs");
	assert.strictEqual(response.body.length, helper.initialBlog.length);
});

test("Unique identifier property of blog is named id", async () => {
	const response = await api.get("/api/blogs");

	const sampleBlog = response.body[0];
	assert.ok(sampleBlog.hasOwnProperty("id"));
	assert.ok(!sampleBlog.hasOwnProperty("_id"));
});

test("a specific blog can be viewed", async () => {
	const blogsAtStart = await helper.blogsInDb();
	const blogToView = blogsAtStart[0];

	const resultBlog = await api
		.get(`/api/blogs/${blogToView.id}`)
		.expect(200)
		.expect("Content-Type", /application\/json/);

	assert.deepStrictEqual(resultBlog.body, blogToView);
});

test("a valid blog can be added", async () => {
	const newBlog = {
		_id: "5a422b3a1b54a676234d17f9",
		title: "Test",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0,
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const blogAtEnd = await helper.blogsInDb();

	const response = await api.get("/api/blogs");
	assert.strictEqual(response.body.length, helper.initialBlog.length + 1);

	const titles = blogAtEnd.map((b) => b.title);
	assert(titles.includes("Test"));
});

test("default 0 for missing likes property", async () => {
	const newBlog = {
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		__v: 0,
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const response = await api
		.get(`/api/blogs/${newBlog._id}`)
		.expect(200)
		.expect("Content-Type", /application\/json/);

	assert.strictEqual(response.body.likes, 0);
});

test("Missing title Blog not added", async () => {
	const missingTitleBlog = {
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
	};

	await api.post("/api/blogs").send(missingTitleBlog).expect(400);

	const blogAtEnd = await helper.blogsInDb();

	assert.strictEqual(blogAtEnd.length, helper.initialBlog.length);
});

test("Missing url Blog not added", async () => {
	const missingUrlBlog = {
		author: "Edsger W. Dijkstra",
		title: "Test",
	};

	await api.post("/api/blogs").send(missingUrlBlog).expect(400);

	const blogAtEnd = await helper.blogsInDb();

	assert.strictEqual(blogAtEnd.length, helper.initialBlog.length);
});

test("Delete single blog post", async () => {
	const initialBlog = await helper.blogsInDb();
	const blogToDelete = initialBlog[0];

	await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

	const blogsAtEnd = await helper.blogsInDb();

	const titles = blogsAtEnd.map(b => b.title);
	assert(!titles.includes(blogToDelete.title));

	assert.strictEqual(blogsAtEnd.length, helper.initialBlog.length - 1);
});

test("Update likes of single blog post", async () => {
	const initialBlog = await helper.blogsInDb();
	let blogToUpdate = initialBlog[0];

	const updatedLikes = blogToUpdate.likes + 1;
	
	await api
		.put(`/api/blogs/${blogToUpdate.id}`)
		.send({ likes: updatedLikes })
		.expect(200)
		.expect("Content-Type", /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();
	const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id);

	assert.strictEqual(updatedBlog.likes, updatedLikes);
});

after(async () => {
	await mongoose.connection.close();
});
