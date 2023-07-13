import React from 'react';
import {
    Container, Accordion, AccordionSummary,
    AccordionDetails, Box, Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Account from '../components/account';
import { getCustomerByUsername, getAccountsByCustomerId } from '../api/customers';

export default function Accounts() {
    const [user, setUser] = React.useState({});
    const [accountData, setAccountData] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false);

    React.useEffect(() => {
        const fetchUser = async () => {
            const username = sessionStorage.getItem("username");
            const response = await getCustomerByUsername(username);
            setUser(response.data);
            setAccountData(response.data.accounts);
        }
        fetchUser();
    }, [refresh])

    console.log(user);
    console.log(accountData);

    const accountsData = [
        {
            accountId: 4472,
            balance: "$1,350",
            type: "checking"
        },
        {
            accountId: 3714,
            balance: "$650",
            type: "saving"
        },
        {
            accountId: 8976,
            balance: "$0.36",
            type: "checking"
        }
    ];

    const creditCard = {
        accountId: 5755,
        balance: "$1,179",
        type: "credit card"
    }

    return (
        <Container sx={{ display: "flex", flexDirection: "column", gap: "1em", padding: "2em 1em" }}>
            <Accordion className='accountAccordion'>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h2>Bank accounts</h2>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    {
                        accountData.map((account: any, i) => {
                            if (account.type.toUpperCase() === "CREDIT" || account.type.toUpperCase() === "LOAN") return "";
                            return (
                                <Box key={i}>
                                    <Account {...account} refresh={() => setRefresh(!refresh)}/>
                                    {
                                        i === accountData.length - 1 ?
                                            "" : <Divider />
                                    }
                                </Box>
                            )
                        })
                    }
                </AccordionDetails>
            </Accordion>

            <Accordion className='accountAccordion'>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h2>Credit Cards & Loans</h2>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    {
                        accountData.map((account: any, i) => {
                            if (account.type.toUpperCase() === "CREDIT" || account.type.toUpperCase() === "LOAN") {
                                if (account.status !== null && account.status.statusName === "Pending") return "";
                                return (
                                    <Box key={i}>
                                        <Account {...account} credit="true" refresh={() => setRefresh(!refresh)} />
                                        {
                                            i === accountData.length - 1 ?
                                                "" : <Divider />
                                        }
                                    </Box>
                                )
                            }
                        })
                    }
                </AccordionDetails>
            </Accordion>

            <Accordion className='accountAccordion'>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h2>Pending Accounts</h2>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    {
                        accountData.map((account: any, i) => {
                            if (account.type.toUpperCase() === "CREDIT" || account.type.toUpperCase() === "LOAN") {
                                if (account.status !== null && account.status.statusName === "Pending") {
                                    return (
                                        <Box key={i}>
                                            <Account {...account} credit="true" refresh={() => setRefresh(!refresh)}/>
                                            {
                                                i === accountData.length - 1 ?
                                                    "" : <Divider />
                                            }
                                        </Box>
                                    )
                                }
                            }
                        })
                    }
                </AccordionDetails>
            </Accordion>
        </Container>
    )
}