import React from 'react';
import {
    Container, Accordion, AccordionSummary,
    AccordionDetails, Divider, Table,
    TableHead, TableBody, TableRow,
    TableCell
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function Transactions() {

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
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h2>View Transactions</h2>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <Table>
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
                                transactionsData.map((transaction, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{transaction.date}</TableCell>
                                        <TableCell>{transaction.description}</TableCell>
                                        <TableCell>{transaction.type}</TableCell>
                                        <TableCell>{transaction.amount}</TableCell>
                                        <TableCell>{transaction.balance}</TableCell>
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