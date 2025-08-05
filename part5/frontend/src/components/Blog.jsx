import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
	const [visible, setVisible] = useState(false)
	
	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const handleUpdateBlog = (event) => {
		event.preventDefault()
		updateBlog({
			...blog,
			likes: blog.likes + 1
		})
	}

	const handleDelete = (event) => {
		event.preventDefault()
		
		const confirmDelete = window.confirm(`Remove ${blog.title} by ${blog.author}`)
		
		if (confirmDelete) {
			deleteBlog(blog)
		}
	}

	const blogStyle = {
			paddingTop: 10,
			paddingLeft: 2,
			border: 'solid',
			borderWidth: 1,
			marginBottom: 5
		}

	return (
		<div style={blogStyle}>
			<div style={hideWhenVisible}>
				<span>{blog.title}       </span>
				<button onClick={toggleVisibility}>view</button>
			</div>
			<div style={showWhenVisible}>
				<span>{blog.title}       </span>
				<button onClick={toggleVisibility}>hide</button>

				<div>{blog.url}</div>
				<div>
					likes {blog.likes}
					<button onClick={handleUpdateBlog}>like</button>
				</div>
				<div>{blog.user.username}</div>
				<button onClick={handleDelete}>remove</button>
			</div>
		</div>
)}

export default Blog