import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UsersInfo = () => {
	const users = useSelector(state => state.users)
	console.log(users)
	
    return (
        <div>
            <h2>Users</h2>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
								<li>
									<Link to={`/users/${user.id}`}>{user.username}</Link>
								</li>
							</td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersInfo;
