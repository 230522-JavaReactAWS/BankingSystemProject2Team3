import React from "react";
import axios from "axios";
import {
    Container, Accordion, AccordionSummary,
    AccordionDetails, Box, Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Account from '../components/account';

export default function Accounts() {

    React.useEffect(() => {
        axios
            .get("http://localhost:8080/customers/username/" + sessionStorage.getItem("username"),{
                headers: {
                    Authorization: "Bearer: " + sessionStorage.getItem("token")
                }
            })
            .then((response) =>{
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },[])

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
            <Accordion className='accountAccordion' sx={{width: {md: "70%"}}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h2>Bank accounts</h2>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    {
                        accountsData.map((account, i) => (
                            <Box key={i}>
                                <Account {...account} />
                                {
                                    i === accountsData.length - 1 ?
                                        "" : <Divider />
                                }
                            </Box>
                        ))
                    }
                </AccordionDetails>
            </Accordion>

            <Accordion className='accountAccordion' sx={{width: {md: "70%"}}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h2>Credit cards</h2>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <Account {...creditCard} />
                </AccordionDetails>
            </Accordion>
        </Container>
    )
}