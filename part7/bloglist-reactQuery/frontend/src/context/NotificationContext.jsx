import { createContext, useContext, useReducer } from 'react';

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

export const useNotify = () => {
	const temp = useContext(NotificationContext)
	const dispatch = temp[1]
	return (msg, isError) => {
		if (isError) {
			dispatch({
                type: 'ERROR',
                payload: msg,
            });   
		} else {
			dispatch({
                type: 'SET',
                payload: msg,
            }); 
		}

		setTimeout(() => {
            dispatch({ type: 'CLEAR' });
        }, 2000);
	}
}

export default NotificationContext;
