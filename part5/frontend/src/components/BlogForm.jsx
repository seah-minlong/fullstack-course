import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
	
	const [newTitle, setNewTitle] = useState("");
	const [newAuthor, setNewAuthor] = useState("");
	const [newUrl, setNewUrl] = useState("");
	
	const handleSubmit = (event) => {
		event.preventDefault()
		addBlog({
			title: newTitle,
			author: newAuthor,
			url: newUrl
		})

		setNewAuthor("")
		setNewTitle("")
		setNewUrl("")
	}

	return (
		<div>
			<h2>create new</h2>

			<form onSubmit={handleSubmit}>
				<div> title: <input value={newTitle} onChange={event => setNewTitle(event.target.value)} /></div>
				<div> author: <input value={newAuthor} onChange={event => setNewAuthor(event.target.value)} /></div>
				<div> url: <input value={newUrl} onChange={event => setNewUrl(event.target.value)} /></div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</div>
	)
};

export default BlogForm;
