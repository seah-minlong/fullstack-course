import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { useDispatch, useSelector } from "react-redux";
import { setNotification, setError } from "./reducers/notificationReducer";
import {
	initialiseBlogs,
	createBlog,
	changeBlog,
	delBlog,
} from "./reducers/blogReducer";
import { setUser, removeUser } from './reducers/userReducer'

const App = () => {
	const dispatch = useDispatch();

	const blogs = useSelector((state) => state.blogs);
	const user = useSelector((state) => state.user);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const blogFormRef = useRef();

	useEffect(() => {
		dispatch(initialiseBlogs());
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			dispatch(setUser(user));
			blogService.setToken(user.token);
		}
	}, []);

	const addBlog = async (blogObject) => {
		blogFormRef.current.toggleVisibility();

		try {
			dispatch(createBlog(blogObject));
			dispatch(
				setNotification(
					`A new blog ${blogObject.title} by ${blogObject.author} added`
				)
			);
		} catch (exception) {
			dispatch(setError(`Error adding blog: ${exception.message}`));
		}
	};

	const updateBlog = async (blogObject) => {
		try {
			dispatch(changeBlog(blogObject));
		} catch (exception) {
			dispatch(setError(`Error updating blog: ${exception.message}`));
		}
	};

	const deleteBlog = async (blogObject) => {
		try {
			dispatch(delBlog(blogObject));
			dispatch(
				setNotification(`Deleted ${blogObject.title} by ${blogObject.author}`)
			);
		} catch (exception) {
			dispatch(setError(`Error deleting blog: ${exception.message}`));
		}
	};

	const handleLogout = (event) => {
		event.preventDefault();

		window.localStorage.removeItem("loggedBlogappUser");
		dispatch(removeUser());
	};

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
			blogService.setToken(user.token);
			dispatch(setUser(user));
			setUsername("");
			setPassword("");
		} catch (exception) {
			dispatch(setError("Wrong username or password"));
		}
	};

	if (user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
				<Notification />
				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							id="username"
							type="text"
							value={username}
							name="Username"
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
						password
						<input
							id="password"
							type="password"
							value={password}
							name="Password"
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button id="login-button" type="submit">
						login
					</button>
				</form>
			</div>
		);
	}

	return (
		<div>
			<div>
				<h2>blogs</h2>
				<Notification />
				<span>{user.username} logged in</span>
				<button onClick={handleLogout}>logout</button>
			</div>

			<div>
				<br />
				<Togglable buttonLabel="create new blog" ref={blogFormRef}>
					<BlogForm addBlog={addBlog} />
				</Togglable>

				{[...blogs]
					.sort((a, b) => b.likes - a.likes)
					.map((blog) => (
						<Blog
							key={blog.id}
							blog={blog}
							updateBlog={updateBlog}
							deleteBlog={deleteBlog}
							user={user}
						/>
					))}
			</div>
		</div>
	);
};

export default App;
