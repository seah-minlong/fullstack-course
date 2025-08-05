import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {

	const initialNotification = { message: '', isError: false }
	const [notification, setNotification] = useState(initialNotification)

	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const blogFormRef = useRef()

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const addBlog = async (blogObject) => {

		blogFormRef.current.toggleVisibility()

		try {
			const returnedBlog = await blogService.create(blogObject)

			setBlogs(blogs.concat(returnedBlog))
			setNotification({ message: `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`, isError: false })
		} catch (exception) {
			setNotification({ message: `Error adding blog`, isError: true })
		}

		setTimeout(() => {
			setNotification(initialNotification)
		}, 2000)
	}

	const updateBlog = async (blogObject) => {
		try {
			const returnedBlog = await blogService.update(blogObject.id, blogObject)

			setBlogs(blogs.map(blog =>
				blog.id === returnedBlog.id ? returnedBlog : blog
			))
		} catch (exception) {
			setNotification({ message: `Error updating blog: ${exception}`, isError: true })
		}

		setTimeout(() => {
			setNotification(initialNotification)
		}, 2000)
	}

	const deleteBlog = async (blogObject) => {
		try {
			await blogService.deleteBlog(blogObject.id)
			setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
			setNotification({ message: `Deleted ${blogObject.title} by ${blogObject.author}`, isError: false })
		} catch (exception) {
			setNotification({ message: `Error deleting blog: ${exception}`, isError: true })
		}

		setTimeout(() => {
			setNotification(initialNotification)
		}, 2000)
	}

	const handleLogout = (event) => {
		event.preventDefault()

		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')

		} catch (exception) {
			setNotification({ message: 'Wrong username or password', isError: true })
			setTimeout(() => {
				setNotification(initialNotification)
			}, 2000)
		}
	}

	if (user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
				<Notification message={notification.message} isError={notification.isError} />
				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							type="text"
							value={username}
							name="Username"
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
						password
						<input
							type="password"
							value={password}
							name="Password"
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button type="submit">login</button>
				</form>
			</div>
		)
	}

	return (
		<div>
			<div>
				<h2>blogs</h2>
				<Notification message={notification.message} isError={notification.isError} />
				<span>
					{user.username} logged in
				</span>
				<button onClick={handleLogout}>
					logout
				</button>
			</div>

			<div>
				<br />
				<Togglable buttonLabel='create new blog' ref={blogFormRef}>
					<BlogForm
						addBlog={addBlog}
					/>
				</Togglable>

				{blogs
					.sort((a, b) => b.likes - a.likes)	
					.map(blog =>
						<Blog
							key={blog.id}
							blog={blog}
							updateBlog={updateBlog}
							deleteBlog={deleteBlog}
						/>
					)}
			</div>
		</div>
	)
}

export default App