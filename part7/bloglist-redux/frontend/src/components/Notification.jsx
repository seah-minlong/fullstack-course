import { useSelector } from "react-redux";

const Notification = () => {
	const notification = useSelector((state) => state.notification);

	if (!notification.message) {
		return null;
	}

	const notificationStyle = {
		color: notification.isError ? "red" : "green",
		background: "lightgrey",
		fontSize: "20px",
		borderStyle: "solid",
		borderRadius: "5px",
		padding: "10px",
		marginBottom: "10px",
	};

	return (
		<div className="notification" style={notificationStyle}>
			{notification.message}
		</div>
	);
};

export default Notification;
