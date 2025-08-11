import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const isCreator = user && blog.user && user.username === blog.user.username;

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleUpdateBlog = (event) => {
    event.preventDefault();
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const handleDelete = (event) => {
    event.preventDefault();

    const confirmDelete = window.confirm(
      `Remove ${blog.title} by ${blog.author}`,
    );

    if (confirmDelete) {
      deleteBlog(blog);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <span>{blog.title} </span>
        <span>{blog.author} </span>
        <button onClick={toggleVisibility} style={hideWhenVisible}>
          view
        </button>
        <button onClick={toggleVisibility} style={showWhenVisible}>
          hide
        </button>
      </div>

      <div style={showWhenVisible} className="togglableContent">
        <div>{blog.url}</div>
        <div id="likes">
          likes {blog.likes}
          <button onClick={handleUpdateBlog}>like</button>
        </div>
        <div>{blog.user.username}</div>

        {isCreator && <button onClick={handleDelete}>remove</button>}
      </div>
    </div>
  );
};

export default Blog;
