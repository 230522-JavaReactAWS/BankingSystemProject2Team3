import React from "react";
import {
    Box, Container, Button,
    Menu, MenuItem
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function Account(props: any) {
    const [anchorElMore, setAnchorElMore] = React.useState<null | HTMLElement>(null);

    const handleOpenMore = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorElMore(e.currentTarget);

    const handleCloseMore = () => setAnchorElMore(null);

    const moreOptions = ["Account details", "Statements", "Account & routing numbers", "Transfer Activity", "Order checks & deposit slips"];

    const creditOptions = ["Account details", "Card benefits", "Request a credit limit increase", "Spending report", "Pay over time"];

    if (props.type !== "credit card") {
        return (
            <Container sx={{
                padding: "1em", margin: "0.5em 0", display: "flex",
                flexDirection: "column", gap: "1.5em"
            }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h4 className="accountType">{`${props.type.toUpperCase()} (...${props.accountId})`}</h4>
                    <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "0.5em" }}>
                        <Button sx={{ color: "var(--blue)", border: "1px solid var(--blue)" }} size="small" variant="outlined">Transfer Money</Button>
                        <Button onClick={handleOpenMore} sx={{ color: "var(--blue)", border: "1px solid var(--blue)" }} size="small" variant="outlined">More <ExpandMoreIcon /></Button>
                        <Menu
                            open={Boolean(anchorElMore)}
                            anchorEl={anchorElMore}
                            onClose={handleCloseMore}
                            keepMounted
                        >
                            {
                                moreOptions.map((option, i) => (
                                    <MenuItem key={i}>{option}</MenuItem>
                                ))
                            }
                        </Menu>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                    <div className="accountAmounts">
                        <h3>{props.balance}</h3>
                        <p>Available balance</p>
                    </div>
                    <div className="accountAmounts">
                        <p>+$400.00</p>
                        <p>Deposits this month</p>
                    </div>
                    <div className="accountAmounts">
                        <p>-$235.44</p>
                        <p>Withdrawals this month</p>
                    </div>
                </Box>
            </Container>
        )
    } else {
        return (
            <Container sx={{
                padding: "1em", margin: "0.5em 0", display: "flex",
                flexDirection: "column", gap: "1.5em"
            }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h4 className="accountType">{`${props.type.toUpperCase()} (...${props.accountId})`}</h4>
                    <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "0.5em" }}>
                        <Button sx={{ color: "var(--blue)", border: "1px solid var(--blue)" }} size="small" variant="outlined">Pay card</Button>
                        <Button onClick={handleOpenMore} sx={{ color: "var(--blue)", border: "1px solid var(--blue)" }} size="small" variant="outlined">More <ExpandMoreIcon /></Button>
                        <Menu
                            open={Boolean(anchorElMore)}
                            anchorEl={anchorElMore}
                            onClose={handleCloseMore}
                            keepMounted
                        >
                            {
                                creditOptions.map((option, i) => (
                                    <MenuItem key={i}>{option}</MenuItem>
                                ))
                            }
                        </Menu>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                    <div className="accountAmounts">
                        <h3>{props.balance}</h3>
                        <p>Current balance</p>
                    </div>
                    <div className="accountAmounts">
                        <p>Aug 2, 2023</p>
                        <p>Payment due date</p>
                    </div>
                    <div className="accountAmounts">
                        <p>$40.00</p>
                        <p>Minimum payment due</p>
                    </div>
                    <div className="accountAmounts">
                        <p>$930.00</p>
                        <p>Available credit</p>
                    </div>
                </Box>
            </Container>
        )
    }
}