import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: "",
	reducers: {
		showNotification(state, action) {
			return action.payload;
		},
		removeNotification(state, action) {
			return "";
		},
	},
});

export const setNotification = (content, seconds) => {
	return (dispatch) => {
		dispatch(showNotification(content));
		setTimeout(() => {
			dispatch(removeNotification());
		}, seconds * 1000);
	};
};

export const { showNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer;
