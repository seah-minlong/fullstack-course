import { useState } from 'react'
import { Button } from '@mui/material';

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
                <div>
                    {' '}
                    title:
                    <input
                        id="title"
                        value={newTitle}
                        onChange={event => setNewTitle(event.target.value)}
                        placeholder="title"
                    />
                </div>
                <div>
                    {' '}
                    author:
                    <input
                        id="author"
                        value={newAuthor}
                        onChange={event => setNewAuthor(event.target.value)}
                        placeholder="author"
                    />
                </div>
                <div>
                    {' '}
                    url:
                    <input
                        id="url"
                        value={newUrl}
                        onChange={event => setNewUrl(event.target.value)}
                        placeholder="url"
                    />
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        id="submit-blogForm"
                        type="submit"
                    >
                        add
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;
