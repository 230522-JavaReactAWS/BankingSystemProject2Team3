import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../css/dashboard.css";
import NavBar from "../components/navbar";
import { Auth } from "../components/Auth";
import Account from "../components/account";

export default function Dashboard() {
    React.useEffect(() => {
        const darkMode = sessionStorage.getItem("darkMode");

        if (darkMode === "true") {
            document.querySelector("body")?.classList.add("dark");
        } else {
            document.querySelector("body")?.classList.remove("dark");
        }
    }, [])

    return (
        <div className="dashboard" style={{ backgroundImage: "url(/revatrustBackground.png)" }} >
            <NavBar />
            <div className="router">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Auth />}></Route>
                        <Route path="/accounts" element={<Account />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
};