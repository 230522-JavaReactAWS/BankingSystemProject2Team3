import React from 'react';
import {
    Container, Accordion, AccordionSummary,
    AccordionDetails, Divider, Table,
    TableHead, TableBody, TableRow,
    TableCell
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "../css/transactions.css"
import { getCustomerByUsername } from '../api/customers';
import { getAllTransactions } from '../api/transactions';


export default function Transactions() {
    const [transactions, setTransactions] = React.useState([]);
    const [username, setUsername] = React.useState(sessionStorage.getItem("username"));
    const [role, setRole] = React.useState("");

    React.useEffect(() => {
        const fetchUser = async () => {
            const transactionsData = await getAllTransactions();
            setTransactions(transactionsData.data);
            const userData = await getCustomerByUsername(username);
            setRole(userData.data.role.roleTitle)
        }
        fetchUser();
    }, []);

    const userTransactions = transactions.filter((transaction:any) => transaction.customer.username === username);
    
    console.log(userTransactions);

    const getDate = (time:any) => {
        const date = new Date(time);
        return date.toLocaleDateString();
    }

    const transactionsData = [
        {
            date: "7/11/2023",
            description: "Payment for groceries",
            type: "withdrawal",
            amount: "$79.99",
            from: "Rafael",
            to: "Grocery store",
            balance: "$100"
        },
        {
            date: "7/11/2023",
            description: "Shopping at the mall",
            type: "withdrawal",
            amount: "$189.47",
            from: "Rafael",
            to: "Mall",
            balance: "$240"
        },
        {
            date: "7/11/2023",
            description: "Paycheck deposit",
            type: "deposit",
            amount: "$679.99",
            from: "Work",
            to: "Rafael",
            balance: "$600"
        }
    ]

    return (
        <Container sx={{ padding: "2em 1em" }}>
            <Accordion className='accountAccordion'>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h2>View Transactions</h2>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <Table className='transactionTable'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Balance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                role === "Manager" ?
                                transactions.map((transaction:any, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{getDate(transaction.createdAt)}</TableCell>
                                        <TableCell>{transaction.description}</TableCell>
                                        <TableCell>{transaction.origin.type}</TableCell>
                                        <TableCell>${transaction.amount}</TableCell>
                                        <TableCell>${transaction.origin.balance}</TableCell>
                                    </TableRow>
                                )) :
                                userTransactions.map((transaction:any, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{getDate(transaction.createdAt)}</TableCell>
                                        <TableCell>{transaction.description}</TableCell>
                                        <TableCell>{transaction.origin.type}</TableCell>
                                        <TableCell>${transaction.amount}</TableCell>
                                        <TableCell>${transaction.origin.balance}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </AccordionDetails>
            </Accordion>
        </Container>
    )
}