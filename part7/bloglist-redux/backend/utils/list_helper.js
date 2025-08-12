const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const reducer = (sum, blog) => {
		return sum + blog.likes;
	};

	return blogs.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
	return blogs.reduce((fav, blog) => {
		return blog.likes > fav.likes ? blog : fav;
	});
};

const mostBlogs = (arrayOfBlogs) => {
	const authors = {};
	let max = 0;
	let topAuthor = "";

	for (const blogs of arrayOfBlogs) {
		for (const blog of blogs) {
			if (!authors[blog.author]) {
				authors[blog.author] = 1;
			} else {
				authors[blog.author] += 1;
			}

			if (authors[blog.author] > max) {
				max = authors[blog.author];
				topAuthor = blog.author;
			}
		}
	}

	return {
		author: topAuthor,
		blogs: max,
	};
};

const mostLikes = (arrayOfBlogs) => {
	const authors = {};
	let max = 0;
	let topAuthor = "";

	for (const blogs of arrayOfBlogs) {
		for (const blog of blogs) {
			if (!authors[blog.author]) {
				authors[blog.author] = blog.likes;
			} else {
				authors[blog.author] += blog.likes;
			}

			if (authors[blog.author] > max) {
				max = authors[blog.author];
				topAuthor = blog.author;
			}
		}
	}

	return {
		author: topAuthor,
		likes: max,
	};
};

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes
};
