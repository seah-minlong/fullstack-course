import { useState } from 'react';
import { useBlogs } from '../hooks/useBlogs';
import { useNavigate } from 'react-router-dom';
import storage from '../services/storage';

const Blog = ({ blog }) => {
    const { updateBlog, deleteBlog, updateComment } = useBlogs();
    const navigate = useNavigate();
	const [comment, setComment] = useState("")

    if (!blog) {
        return null;
    }

    const canRemove = blog.user ? blog.user.username === storage.me() : true;

    const handleUpvote = event => {
        event.preventDefault();
        updateBlog({
            ...blog,
            likes: blog.likes + 1,
        });
    };

    const handleDelete = event => {
        event.preventDefault();

        const confirmDelete = window.confirm(
            `Remove ${blog.title} by ${blog.author}`
        );

        if (confirmDelete) {
            deleteBlog(blog);
            navigate('/');
        }
    };

	const handleComment = (event) => {
		event.preventDefault()
		updateComment(blog.id, comment)
		setComment('')
	}

    return (
        <div className="blog">
            <h2>
                {blog.title} {blog.author}
            </h2>

            <div>{blog.url}</div>
            <div id="likes">
                likes {blog.likes}
                <button onClick={handleUpvote}>like</button>
            </div>
            <div>{blog.user.username}</div>

            {canRemove && <button onClick={handleDelete}>remove</button>}

            <h2>comments</h2>
            <form onSubmit={handleComment}>
                <input
                    id="comment"
                    value={comment}
                    onChange={event => setComment(event.target.value)}
                />
                <button type="submit">add comment</button>
            </form>
            <ul>
				{blog.comments.map((comment, id) => 
					<li key={id}>{comment}</li>
				)}
			</ul>
        </div>
    );
};

export default Blog;
