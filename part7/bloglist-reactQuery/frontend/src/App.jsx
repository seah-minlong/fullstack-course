import { useState, useEffect, useRef } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

import Notification from './components/Notification';
import UserContext from './context/UserContext';

import { useContext } from 'react';
import NotificationContext from './context/NotificationContext';

const App = () => {
    const [notification, notificationDispatch] = useContext(NotificationContext);
    const [user, userDispatch] = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const blogFormRef = useRef();

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            userDispatch({ type: 'LOGIN', payload: user });
            blogService.setToken(user.token);
        }
    }, []);

    const queryClient = useQueryClient();

    const updateBlogMutation = useMutation({
        mutationFn: ({ id, newObject }) => blogService.update(id, newObject),
        onSuccess: updatedBlog => {
            const blogs = queryClient.getQueryData(['blogs']);
            queryClient.setQueryData(
                ['blogs'],
                blogs.map(n => (n.id === updatedBlog.id ? updatedBlog : n))
            );
        },
        onError: exception => {
            notificationDispatch({
                type: 'ERROR',
                payload: `Error updating blog: ${exception.message}`,
            });
            setTimeout(() => {
                notificationDispatch({ type: 'CLEAR' });
            }, 2000);
        },
    });

    const newBlogMutation = useMutation({
        mutationFn: blogService.create,
        onSuccess: returnedBlog => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });

            notificationDispatch({
                type: 'SET',
                payload: `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
            });
            setTimeout(() => {
                notificationDispatch({ type: 'CLEAR' });
            }, 2000);
        },
        onError: exception => {
            notificationDispatch({
                type: 'ERROR',
                payload: `Error adding blog: ${exception.message}`,
            });
            setTimeout(() => {
                notificationDispatch({ type: 'CLEAR' });
            }, 2000);
        },
    });

    const deleteBlogMutation = useMutation({
        mutationFn: blogService.deleteBlog,
        onSuccess: id => {
            const blogs = queryClient.getQueryData(['blogs']);
            const blogObject = blogs.find(b => b.id === id);

            queryClient.setQueryData(
                ['blogs'],
                blogs.filter(blog => blog.id !== id)
            );

            notificationDispatch({
                type: 'SET',
                payload: `Deleted ${blogObject.title} by ${blogObject.author}`,
            });
            setTimeout(() => {
                notificationDispatch({ type: 'CLEAR' });
            }, 2000);
        },
        onError: exception => {
            notificationDispatch({
                type: 'ERROR',
                payload: `Error deleting blog: ${exception.message}`,
            });
            setTimeout(() => {
                notificationDispatch({ type: 'CLEAR' });
            }, 2000);
        },
    });

    const addBlog = blogObject => {
        blogFormRef.current.toggleVisibility();
        newBlogMutation.mutate(blogObject);
    };

    const updateBlog = blogObject => {
        updateBlogMutation.mutate({ id: blogObject.id, newObject: blogObject });
    };

    const deleteBlog = blogObject => {
        deleteBlogMutation.mutate(blogObject.id);
    };

    const blogQuery = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (blogQuery.isLoading) {
        return <div>loading data...</div>;
    }

    const blogs = blogQuery.data;

    const handleLogout = event => {
        event.preventDefault();

        window.localStorage.removeItem('loggedBlogappUser');
        userDispatch({ type: 'LOGOUT' });
    };

    const handleLogin = async event => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username,
                password,
            });

            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            );
            blogService.setToken(user.token);
            userDispatch({ type: 'LOGIN', payload: user });
            setUsername('');
            setPassword('');
        } catch (exception) {
            notificationDispatch({
                type: 'ERROR',
                payload: `Wrong username or password`,
            });
            setTimeout(() => {
                notificationDispatch({ type: 'CLEAR' });
            }, 2000);
        }
    };

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification />
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            id="username"
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            id="password"
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button id="login-button" type="submit">
                        login
                    </button>
                </form>
            </div>
        );
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

                {blogs
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
        </div>
    );
};

export default App;
