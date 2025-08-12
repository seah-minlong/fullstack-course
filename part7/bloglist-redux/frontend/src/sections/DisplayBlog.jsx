import Blog from '../components/Blog';
import { useBlogs } from '../hooks/useBlogs';

const DisplayBlog = () => {
    const { blogs, user, updateBlog, deleteBlog } = useBlogs();

    return (
        <div>
            {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map(blog => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        updateBlog={updateBlog}
                        deleteBlog={deleteBlog}
                        user={user}
                    />
                ))}
        </div>
    );
};

export default DisplayBlog;
