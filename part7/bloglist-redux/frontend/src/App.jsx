import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useMatch, useNavigate, Link } from 'react-router-dom';

import { initialiseBlogs } from './reducers/blogReducer';
import { setUser, removeUser } from './reducers/userReducer';
import { initialiseUsers } from './reducers/usersReducer';

import blogService from './services/blogs';
import storage from './services/storage';

import LoginForm from './sections/LoginForm';
import UsersInfo from './sections/UsersInfo';
import DisplayBlog from './sections/DisplayBlog';
import UserInfo from './sections/UserInfo';
import Blog from './sections/Blog';

const NavBar = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = event => {
        event.preventDefault();
        storage.removeUser();
        dispatch(removeUser());
        navigate('/login');
    };

    const navStyle = {
        padding: '10px',
        backgroundColor: '#f0f0f0',
        borderBottom: '1px solid #ddd',
    };

    const linkStyle = {
        marginRight: '10px',
        textDecoration: 'underline',
        color: '#0066cc',
    };

    if (!user) {
        return null;
    }

    return (
        <div style={navStyle}>
            <Link to="/" style={linkStyle}>
                blogs
            </Link>
            <Link to="/users" style={linkStyle}>
                users
            </Link>
            <span style={{ marginLeft: '20px' }}>
                {user.username} logged in
                <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
                    logout
                </button>
            </span>
        </div>
    );
};

const App = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const users = useSelector(state => state.users);
    const blogs = useSelector(state => state.blogs);

    useEffect(() => {
        dispatch(initialiseBlogs());
        dispatch(initialiseUsers());
    }, []);

    useEffect(() => {
        const user = storage.loadUser();
        if (user) {
            dispatch(setUser(user));
            blogService.setToken(user.token);
        }
    }, []);

    const match = useMatch('/users/:id');
    const userInfo = match ? users.find(n => n.id === match.params.id) : null;

    const blogMatch = useMatch('/blogs/:id');
    const blog = blogMatch
        ? blogs.find(n => n.id === blogMatch.params.id)
        : null;

    if (!user) {
        return (
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="*" element={<LoginForm />} />
            </Routes>
        );
    }

    return (
        <div>
            <NavBar />

            <h2>blog app</h2>
            <Routes>
                <Route
                    path="/users/:id"
                    element={<UserInfo userInfo={userInfo} />}
                />
                <Route path="/users" element={<UsersInfo />} />
                <Route path="/" element={<DisplayBlog />} />
                <Route path="/blogs" element={<DisplayBlog />} />
                <Route path="/blogs/:id" element={<Blog blog={blog} />} />
            </Routes>
        </div>
    );
};

export default App;
