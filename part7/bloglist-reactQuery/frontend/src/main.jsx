import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationContextProvider } from './context/NotificationContext';
import { UserContextProvider } from './context/UserContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <UserContextProvider>
            <NotificationContextProvider>
                <App />
            </NotificationContextProvider>
        </UserContextProvider>
    </QueryClientProvider>
);
