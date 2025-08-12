import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useMatch, Navigate } from 'react-router-dom';

import { initialiseBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';
import { initialiseUsers } from './reducers/usersReducer';

import blogService from './services/blogs';

import LoginForm from './sections/LoginForm';
import UsersInfo from './sections/UsersInfo';
import BlogHeader from './sections/BlogHeader';
import DisplayBlog from './sections/DisplayBlog';
import UserInfo from './sections/UserInfo';

const App = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const users = useSelector(state => state.users);

    useEffect(() => {
        dispatch(initialiseBlogs());
        dispatch(initialiseUsers());
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
            blogService.setToken(user.token);
        }
    }, []);

    const match = useMatch('/users/:id');
    const userInfo = match
        ? users.find(n => n.id === match.params.id)
        : null;

    return (
        <div>
            {user && <BlogHeader />}
            <br />

            <Routes>
                <Route
                    path="/users/:id"
                    element={
                        user ? (
                            <UserInfo userInfo={userInfo} />
                        ) : (
                            <Navigate replace to="/login" />
                        )
                    }
                />
                <Route
                    path="/users"
                    element={
                        user ? <UsersInfo /> : <Navigate replace to="/login" />
                    }
                />
                <Route
                    path="/blogs"
                    element={
                        user ? (
                            <DisplayBlog />
                        ) : (
                            <Navigate replace to="/login" />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={user ? <Navigate replace to="/" /> : <LoginForm />}
                />
                <Route
                    path="/"
                    element={
                        user ? <UsersInfo /> : <Navigate replace to="/login" />
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
