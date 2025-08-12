import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	message: "",
	isError: false,
};

const notificationSlice = createSlice({
	name: "notification",
	initialState: initialState,
	reducers: {
		showNotification(state, action) {
			return {
				message: action.payload,
				isError: false,
			};
		},
		showError(state, action) {
			return {
				message: action.payload,
				isError: true,
			};
		},
		removeNotification(state, action) {
			return initialState;
		},
	},
});

export const setNotification = (content) => {
	return (dispatch) => {
		dispatch(showNotification(content));
		setTimeout(() => {
			dispatch(removeNotification());
		}, 2000);
	};
};

export const setError = (content) => {
	return (dispatch) => {
		dispatch(showError(content));
		setTimeout(() => {
			dispatch(removeNotification());
		}, 2000);
	};
};

export const { showNotification, showError, removeNotification } =
	notificationSlice.actions;
export default notificationSlice.reducer;
