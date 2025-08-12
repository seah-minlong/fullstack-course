import Notification from '../components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../reducers/userReducer';

const BlogHeader = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	const handleLogout = event => {
			event.preventDefault();
	
			window.localStorage.removeItem('loggedBlogappUser');
			dispatch(removeUser());
		};

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <span>{user.username} logged in</span>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default BlogHeader;
