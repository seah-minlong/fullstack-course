import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initialiseBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';
import { initialiseUsers } from './reducers/usersReducer';

import blogService from './services/blogs';

import LoginForm from './sections/LoginForm';
import UserInfo from './sections/UserInfo';
import BlogHeader from './sections/BlogHeader';
import CreateBlog from './components/CreateBlog';
import DisplayBlog from './sections/DisplayBlog';

const App = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

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

    

    if (user === null) {
        return <LoginForm />;
    }

    return (
        <div>
            <BlogHeader />
            <br />
            <CreateBlog />
            <DisplayBlog />
            <UserInfo />
        </div>
    );
};

export default App;
