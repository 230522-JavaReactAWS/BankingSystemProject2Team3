import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './css/App.css';
import Dashboard from './pages/dashboard';
import Accounts from "./pages/accounts";
import reportWebVitals from './reportWebVitals';
import Transactions from './pages/transactions';
import ApplyForLoan from './pages/applyForLoan';

//Creating Router instance
const router = createBrowserRouter([
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "/dashboard/accounts",
                element: <Accounts />
            },
            {
                path: "/dashboard/transactions",
                element: <Transactions />
            },
            {
                path: "/dashboard/apply",
                element: <ApplyForLoan />
            },
        ]
    },
    {
        path: "/auth",
        element: <div>register</div>
    }
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
