import React from 'react';
import {
    Container, TextField, Button,
    Snackbar, Select, MenuItem
} from '@mui/material';
import { openNewAccount } from '../api/transactions';
import { getCustomerByUsername } from '../api/customers';

export default function LoanForm() {
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [user, setUser] = React.useState({
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        state: "",
        zip: ""
    });

    React.useEffect(() => {
        const fetchUser = async () => {
            const username = sessionStorage.getItem("username");
            const response = await getCustomerByUsername(username);
            setUser({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                streetAddress: response.data.streetAddress,
                city: response.data.city,
                state: response.data.state,
                zip: response.data.zip
            });
        }
        fetchUser();
    }, [])

    const handleSubmit = async () => {
        const response = await openNewAccount(type, amount);
        if (response.status === 200) {

            setOpen(true);
        }
    };
    const handleClose = () => setOpen(false);

    return (
        <Container className='loanFormContainer' sx={{ display: "flex", flexDirection: "column", width: { md: "70%" }, gap: "0.5em" }}>
            <h3>Apply for a Loan</h3>
            <TextField disabled variant='filled' label={`${user.firstName} ${user.lastName}`} size='small' />
            <TextField disabled variant='filled' label={`${user.streetAddress}`} size='small' />
            <TextField disabled variant='filled' label={`${user.city}, ${user.state} ${user.zip}`} size='small' />
            <Select
                label='Type'
                value={type}
                size='small'
                onChange={(e) => setType(e.target.value)}
            >
                <MenuItem value={"CREDIT"}>Credit</MenuItem>
                <MenuItem value={"LOAN"}>Loan</MenuItem>
            </Select>
            <TextField onChange={(e) => setAmount(e.target.value)} color='warning' variant='standard' type='number' label='Loan Amount' placeholder='Enter Amount' size='small' />
            <br />
            <Button onClick={handleSubmit} color='warning'>Submit Application</Button>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={open}
                onClose={handleClose}
                message="Application successfully submitted"
            />
        </Container>
    )
}