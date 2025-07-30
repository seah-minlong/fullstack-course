import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './BlogForm'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const [newTitle, setNewTitle] = useState("");
	const [newAuthor, setNewAuthor] = useState("");
	const [newUrl, setNewUrl] = useState("");

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

	const addBlog = async (event) => {
		event.preventDefault();

		const BlogObject = {
			title: newTitle,
			author: newAuthor, 
			url: newUrl,
			id: String(blogs.length + 1)
		}

		try {
			const returnedBlog = await blogService.create(BlogObject)

			setBlogs(blogs.concat(returnedBlog))

			setNewAuthor("")
			setNewTitle("")
			setNewUrl("")
		} catch (exception) {
			setErrorMessage('Error adding blog')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
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
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const handleTitleChange = (event) => {
		setNewTitle(event.target.value)
	}

	const handleAuthorChange = (event) => {
		setNewAuthor(event.target.value)
	}

	const handleUrlChange = (event) => {
		setNewUrl(event.target.value)
	}

	if (user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
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
				<span>
					{user.username} logged in
				</span>
				<button onClick={handleLogout}>
					logout
				</button>
			</div>

			<div>
				<h2>create new</h2>

				<BlogForm
					addBlog={addBlog}
					newAuthor={newAuthor}
					handleAuthorChange={handleAuthorChange}
					newTitle={newTitle}
					handleTitleChange={handleTitleChange}
					newUrl={newUrl}
					handleUrlChange={handleUrlChange}
				/>
				<br />
				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} />
				)}
			</div>
		</div>
	)
}

export default App