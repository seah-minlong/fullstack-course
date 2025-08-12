import { Link } from 'react-router-dom';

const BlogRow = ({ blog }) => {
        const style = {
            paddingTop: 10,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 5,
        };

    return (
        <div style={style}>
            <Link to={`/blogs/${blog.id}`}>
                {blog.title}
            </Link>
        </div>
    );
};

export default BlogRow;
