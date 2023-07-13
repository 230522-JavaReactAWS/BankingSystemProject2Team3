import React from 'react';
import {
    Container, Divider, Table,
    TableHead, TableBody, TableRow,
    TableCell
} from '@mui/material';
import { Button } from '@mui/base';
import { getAllAccounts } from '../api/accounts';
import { updateAccountStatus } from '../api/transactions';

export default function LoanTable() {
    const [accounts, setAccounts] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false);

    React.useEffect(() => {
        const fetchAccounts = async () => {
            const accountsData = await getAllAccounts();
            setAccounts(accountsData.data);
        }
        fetchAccounts();
    }, [refresh]);

    const handleDecision = async (aid:any, status:any) => {
        const response = await updateAccountStatus(aid, status);
        if (response.status === 200) {
            setRefresh(!refresh);
        }
    }

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
                        {/* <TableCell>Customer</TableCell> */}
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        accounts.map((account: any, i) => {
                            if (account.status !== null && account.status.statusName === "Pending") {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>{account.type}</TableCell>
                                        <TableCell>{account.lendingAmount}</TableCell>
                                        {/* <TableCell>{account.customer}</TableCell> */}
                                        <TableCell>{account.status.statusName}</TableCell>
                                        <TableCell><Button onClick={() => handleDecision(account.id, "Approved")} className='mx-2 p-1'>Approve</Button><Button onClick={() => handleDecision(account.id, "Denied")} className='p-1'>Deny</Button></TableCell>
                                    </TableRow>
                                )
                            }
                        })
                    }
                </TableBody>
            </Table>
        </Container>
    )
}