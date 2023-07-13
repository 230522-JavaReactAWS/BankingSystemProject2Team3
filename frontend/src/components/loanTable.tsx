import React from 'react';
import {
    Container, Divider, Table,
    TableHead, TableBody, TableRow,
    TableCell
} from '@mui/material';
import { Button } from '@mui/base';

export default function LoanTable() {

    const loansData = [
        {
            type: "Loan",
            balance: "$35,000",
            customer: "Rafael",
            status: "Pending"
        },
        {
            type: "Loan",
            balance: "$10,000",
            customer: "Jack",
            status: "Pending"
        },
        {
            type: "Loan",
            balance: "$5,000",
            customer: "Nick",
            status: "Pending"
        },
        {
            type: "Loan",
            balance: "$50,000",
            customer: "Alex",
            status: "Pending"
        }
    ];

    return (
        <Container>
            <h2>All Applications</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Balance</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        loansData.map((loan, i) => (
                            <TableRow key={i}>
                                <TableCell>{loan.type}</TableCell>
                                <TableCell>{loan.balance}</TableCell>
                                <TableCell>{loan.customer}</TableCell>
                                <TableCell>{loan.status}</TableCell>
                                <TableCell><Button className='mx-2 p-1'>Approve</Button><Button className='p-1'>Deny</Button></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Container>
    )
}