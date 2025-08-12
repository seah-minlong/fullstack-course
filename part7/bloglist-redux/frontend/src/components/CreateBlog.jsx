import { useRef } from 'react';
import Togglable from '../components/Togglable';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import BlogForm from '../components/BlogForm';
import { setNotification, setError } from '../reducers/notificationReducer';

const CreateBlog = () => {
	const dispatch = useDispatch();
    const blogFormRef = useRef();

    const addBlog = async blogObject => {
        blogFormRef.current.toggleVisibility();

        try {
            dispatch(createBlog(blogObject));
            dispatch(
                setNotification(
                    `A new blog ${blogObject.title} by ${blogObject.author} added`
                )
            );
        } catch (exception) {
            dispatch(setError(`Error adding blog: ${exception.message}`));
        }
    };

    return (
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
        </Togglable>
    );
};

export default CreateBlog;
