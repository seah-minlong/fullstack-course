import { useDispatch, useSelector } from 'react-redux';
import { setNotification, setError } from '../reducers/notificationReducer';
import { changeBlog, delBlog, createBlog, updateBlogComment } from '../reducers/blogReducer';

export const useBlogs = () => {
    const dispatch = useDispatch();
    const blogs = useSelector(state => state.blogs);
    const user = useSelector(state => state.user);

    const updateBlog = async blogObject => {
        try {
            dispatch(changeBlog(blogObject));
        } catch (exception) {
            dispatch(setError(`Error updating blog: ${exception.message}`));
        }
    };

    const deleteBlog = async blogObject => {
        try {
            dispatch(delBlog(blogObject));
            dispatch(
                setNotification(
                    `Deleted ${blogObject.title} by ${blogObject.author}`
                )
            );
        } catch (exception) {
            dispatch(setError(`Error deleting blog: ${exception.message}`));
        }
    };

    const addBlog = async blogObject => {
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

	const updateComment = async (id, comment) => {
        try {
            dispatch(updateBlogComment(id, comment));
            dispatch(
                setNotification(
                    `Added Comment`
                )
            );
        } catch (exception) {
            dispatch(setError(`Error adding comment: ${exception.message}`));
        }
    };

    return { blogs, user, updateBlog, deleteBlog, addBlog, updateComment };
};
