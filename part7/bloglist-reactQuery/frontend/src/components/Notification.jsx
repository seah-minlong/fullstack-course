const Notification = ({ message, isError }) => {
  if (!message) return null;

  const notificationStyle = {
    color: isError ? "red" : "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
