import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

const Notification = () => {
	const [notification] = useContext(NotificationContext);

	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
		marginBottom: 5,
	};

	return <div style={style}>{notification}</div>;
};

export default Notification;
