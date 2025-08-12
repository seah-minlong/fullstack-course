import { useBlogs } from '../hooks/useBlogs';
import { useNavigate } from 'react-router-dom';
import storage from '../services/storage';

const Blog = ({ blog }) => {
    const { updateBlog, deleteBlog } = useBlogs();
    const navigate = useNavigate();

    if (!blog) {
        return null;
    }

    const canRemove = blog.user ? blog.user.username === storage.me() : true;

    const handleUpdateBlog = event => {
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

    return (
        <div className="blog">
            <h2>
                {blog.title} {blog.author}
            </h2>

            <div>{blog.url}</div>
            <div id="likes">
                likes {blog.likes}
                <button onClick={handleUpdateBlog}>like</button>
            </div>
            <div>{blog.user.username}</div>

            {canRemove && <button onClick={handleDelete}>remove</button>}
        </div>
    );
};

export default Blog;
