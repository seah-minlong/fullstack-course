import { createContext, useReducer } from 'react';

const initialNotification = {
    message: '',
    isError: false,
};

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return {
                message: action.payload,
                isError: false,
            };
        case 'ERROR':
            return {
                message: action.payload,
                isError: true,
            };
        default:
            return initialNotification;
    }
};

const NotificationContext = createContext();

export const NotificationContextProvider = props => {
    const [notification, notificationDispatch] = useReducer(
        notificationReducer,
        ''
    );

    return (
        <NotificationContext.Provider
            value={[notification, notificationDispatch]}
        >
            {props.children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;
