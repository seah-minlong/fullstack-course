import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "SET":
			return action.payload;
		default:
			return "";
	}
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		""
	);

	return (
		<NotificationContext.Provider value={[notification, notificationDispatch]}>
			{props.children}
		</NotificationContext.Provider>
	);
};

export const useNotify = () => {
	const notify = useContext(NotificationContext);
	const dispatch = notify[1];
	return (content) => {
		dispatch({ type: "SET", payload: `voted ${content}` });

		setTimeout(() => {
			dispatch({ type: "CLEAR" });
		}, 5000);
	};
};

export default NotificationContext;
