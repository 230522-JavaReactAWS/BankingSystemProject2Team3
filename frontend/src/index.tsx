import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './css/App.css';
import Dashboard from './pages/dashboard';
import Accounts from "./pages/accounts";
import reportWebVitals from './reportWebVitals';
import Transactions from './pages/transactions';
import ApplyForLoan from './pages/applyForLoan';
import { Auth } from './components/Auth';

//Creating Router instance
const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        children: [
            {
                path: "",
                element: <Auth/>
            },
            {
                path: "/accounts",
                element: <Accounts />
            },
            {
                path: "/transactions",
                element: <Transactions />
            },
            {
                path: "/apply",
                element: <ApplyForLoan />
            }
        ]
    },
])

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
