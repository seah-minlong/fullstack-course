import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useMatch, useNavigate, Link, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';

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

import { AppBar, Toolbar, Button } from '@mui/material'

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

    if (!user) {
        return null;
    }

	return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/">
                    blogs
                </Button>
                <Button color="inherit" component={Link} to="/users">
                    users
                </Button>
                <em>{user.username} logged in</em>
                <Button color="inherit" onClick={handleLogout}>
                    logout
                </Button>
            </Toolbar>
        </AppBar>
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
            <Container>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="*" element={<LoginForm />} />
                </Routes>
            </Container>
        );
    }

    return (
        <Container>
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
                <Route path="/login" element={<Navigate to="/" replace />} />
            </Routes>
        </Container>
    );
};

export default App;
