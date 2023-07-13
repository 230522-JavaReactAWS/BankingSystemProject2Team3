import LoanForm from "../components/loanForm";
import LoanTable from "../components/loanTable";
import { Container } from '@mui/material';
import '../css/loans.css'
import React from "react";
import { getCustomerByUsername } from "../api/customers";

export default function ApplyForLoan() {
    const [role, setRole] = React.useState("");

    React.useEffect(() => {
        const fetchUser = async () => {
            const username = sessionStorage.getItem("username");
            const response = await getCustomerByUsername(username);
            setRole(response.data.role.roleTitle);
        }
        fetchUser();
    }, []);

    return (
        <Container>
            {
                role === "Manager" ?
                <LoanTable />
                : <LoanForm />
            }
        </Container>
    )
}