import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { setError } from '../reducers/notificationReducer';
import { setUser } from '../reducers/userReducer';

import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';

import storage from '../services/storage';
import {
    TextField,
	Button
} from '@mui/material';

const LoginForm = () => {
    const dispatch = useDispatch();
	const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async event => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username,
                password,
            });

            storage.saveUser(user)
            blogService.setToken(user.token);
            dispatch(setUser(user));
            setUsername('');
            setPassword('');
			navigate('/');
        } catch (exception) {
            dispatch(setError(`Wrong username or password`));
            console.log(exception.message);
        }
    };

    return (
        <div>
            <h2>Log in to application</h2>
            <Notification />
            <form onSubmit={handleLogin}>
                <div>
                    <TextField
						label='username'
                        id="username"
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <TextField
						label='password'
                        id="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <Button id="login-button" variant='contained' color='primary' type='submit'>
                    login
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;
