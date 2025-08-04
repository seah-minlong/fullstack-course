import { useState } from 'react'

const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(false)
	
	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
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
					<button>like</button>
				</div>
				<div>{blog.author}</div>
			</div>
		</div>

		
)}

export default Blog