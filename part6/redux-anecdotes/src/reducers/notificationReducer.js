import { createSlice, current } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: "",
	reducers: {
		setNotification(state, action) {
			return action.payload;
		},
		removeNotification(state, action) {
			return ''
		}
	},
});

export const { removeNotification, setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
