import { useBlogs } from '../hooks/useBlogs';
import CreateBlog from '../components/CreateBlog';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material';

const DisplayBlog = () => {
    const { blogs } = useBlogs();

    return (
        <div>
            <CreateBlog />

            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {[...blogs]
                            .sort((a, b) => b.likes - a.likes)
                            .map(blog => (
                                <TableRow key={blog.id}>
                                    <TableCell>
                                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DisplayBlog;
