import { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';

import blogService from './services/blogs';

import { useDispatch, useSelector } from 'react-redux';
import { setNotification, setError } from './reducers/notificationReducer';
import {
    initialiseBlogs,
    createBlog,
    changeBlog,
    delBlog,
} from './reducers/blogReducer';
import { setUser, removeUser } from './reducers/userReducer';

import { initialiseUsers } from './reducers/usersReducer';
import UserInfo from './components/UserInfo';

const App = () => {
    const dispatch = useDispatch();

    const blogs = useSelector(state => state.blogs);
	const user = useSelector(state => state.user);
	
    const blogFormRef = useRef();

    useEffect(() => {
        dispatch(initialiseBlogs());
		dispatch(initialiseUsers())
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
            blogService.setToken(user.token);
        }
    }, []);

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

    const handleLogout = event => {
        event.preventDefault();

        window.localStorage.removeItem('loggedBlogappUser');
        dispatch(removeUser());
    };

    if (user === null) {
        return <LoginForm />;
    }

    return (
        <div>
            <div>
                <h2>blogs</h2>
                <Notification />
                <span>{user.username} logged in</span>
                <button onClick={handleLogout}>logout</button>
            </div>

            <div>
                <br />
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                    <BlogForm addBlog={addBlog} />
                </Togglable>

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

			<UserInfo />
        </div>
    );
};

export default App;
