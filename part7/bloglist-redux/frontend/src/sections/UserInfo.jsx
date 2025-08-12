

const UserInfo = ({ userInfo }) => {

	if (!userInfo) {
		return null
	}

	console.log(userInfo)
	return (
        <div>
            <h2>{userInfo.username}</h2>
            <h3>added blogs</h3>
            <ul>
                {userInfo.blogs.map(b => (
                    <li key={b.id}>{b.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserInfo