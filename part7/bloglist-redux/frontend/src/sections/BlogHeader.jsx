import Notification from '../components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../reducers/userReducer';
import { useNavigate } from 'react-router-dom';

const BlogHeader = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const navigate = useNavigate();

	

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
