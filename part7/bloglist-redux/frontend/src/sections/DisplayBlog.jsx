import { useDispatch, useSelector } from 'react-redux';
import Blog from '../components/Blog';
import { setNotification, setError } from '../reducers/notificationReducer';
import { changeBlog, delBlog } from '../reducers/blogReducer';

const DisplayBlog = () => {
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
