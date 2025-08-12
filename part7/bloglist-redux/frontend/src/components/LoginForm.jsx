import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { setError } from '../reducers/notificationReducer';
import { setUser } from '../reducers/userReducer';

import Notification from '../components/Notification';

const LoginForm = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
            dispatch(setUser(user));
            setUsername('');
            setPassword('');
        } catch (exception) {
            dispatch(setError(`Wrong username or password`));
			console.log(exception.message)
        }
    };

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
};

export default LoginForm;
