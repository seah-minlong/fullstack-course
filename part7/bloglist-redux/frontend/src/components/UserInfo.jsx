import { useSelector } from 'react-redux';

const UserInfo = () => {
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
                            <td>{user.username}</td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserInfo;
