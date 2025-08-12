import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    TableHead,
} from '@mui/material';

const UsersInfo = () => {
    const users = useSelector(state => state.users);
    console.log(users);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Users</TableCell>
                            <TableCell>blogs created</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Link to={`/users/${user.id}`}>
                                        {user.username}
                                    </Link>
                                </TableCell>
                                <TableCell>{user.blogs.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UsersInfo;
