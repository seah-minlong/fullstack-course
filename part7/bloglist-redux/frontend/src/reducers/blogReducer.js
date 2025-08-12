import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { initialiseUsers } from './usersReducer';

const blogSlice = createSlice({
	name: "blogs",
	initialState: [],
	reducers: {
		updateBlog(state, action) {
			const updatedBlog = action.payload;
			return state.map((a) => (a.id !== updatedBlog.id ? a : updatedBlog));
		},
		appendBlog(state, action) {
			state.push(action.payload);
		},
		setBlogs(state, action) {
			return action.payload;
		},
		removeBlog(state, action) {
			const deletedId = action.payload;
			return state.filter((blog) => blog.id !== deletedId);
		},
	},
});

export const { appendBlog, updateBlog, setBlogs, removeBlog } =
	blogSlice.actions;

export const initialiseBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		dispatch(setBlogs(blogs));
	};
};

export const createBlog = (blogObject) => {
	return async (dispatch) => {
		const returnedBlog = await blogService.create(blogObject);
		dispatch(appendBlog(returnedBlog));
		dispatch(initialiseUsers());
	};
};

export const changeBlog = (blogObject) => {
	return async (dispatch) => {
		const returnedBlog = await blogService.update(blogObject.id, blogObject);
		dispatch(updateBlog(returnedBlog));
	};
};

export const delBlog = (blogObject) => {
	return async (dispatch) => {
		await blogService.deleteBlog(blogObject.id);
		dispatch(removeBlog(blogObject.id));
		dispatch(initialiseUsers());
	};
};

export const updateBlogComment = (id, comment) => {
    return async dispatch => {
        const returnedBlog = await blogService.updateComment(id, comment);
        dispatch(updateBlog(returnedBlog)); 
    };
};

export default blogSlice.reducer;
