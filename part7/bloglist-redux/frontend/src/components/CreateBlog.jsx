import { useRef } from 'react';
import Togglable from '../components/Togglable';
import BlogForm from '../components/BlogForm';
import { useBlogs } from '../hooks/useBlogs';

const CreateBlog = () => {
    const { addBlog } = useBlogs();
    const blogFormRef = useRef();

    const handleAddBlog = async blogObject => {
        blogFormRef.current.toggleVisibility();
        await addBlog(blogObject);
    };

    return (
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm addBlog={handleAddBlog} />
        </Togglable>
    );
};

export default CreateBlog;
