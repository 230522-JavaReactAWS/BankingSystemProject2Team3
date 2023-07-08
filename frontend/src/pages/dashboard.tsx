import React from "react";
import "../css/dashboard.css";
import NavBar from "../components/navbar";
import Accounts from "./accounts";

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
        <div className="dashboard">

            <NavBar />
            <Accounts />

        </div>
    );
};