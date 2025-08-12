import { useBlogs } from '../hooks/useBlogs';
import CreateBlog from '../components/CreateBlog';
import BlogRow from '../components/BlogRow';

const DisplayBlog = () => {
    const { blogs } = useBlogs();

    return (
        <div>
            <CreateBlog />
            {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map(blog => (
                    <BlogRow key={blog.id} blog={blog} />
                ))}
        </div>
    );
};

export default DisplayBlog;
