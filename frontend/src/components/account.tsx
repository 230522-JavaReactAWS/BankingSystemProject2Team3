import React from "react";
import {
    Box, Container, Button,
    Menu, MenuItem, Modal,
    Select,
    TextField
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getCustomerByUsername } from "../api/customers";
import { depositAccount, transferAccounts, withdrawAccount } from "../api/transactions";
import { useNavigate } from "react-router";


export default function Account(props: any) {
    const [open, setOpen] = React.useState(false);
    const [targetAccount, setTargetAccount] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [modalContent, setModalContent] = React.useState("");
    const [anchorElMore, setAnchorElMore] = React.useState<null | HTMLElement>(null);
    const [accountData, setAccountData] = React.useState([]);

    React.useEffect(() => {
        const fetchAccounts = async () => {
            const username = sessionStorage.getItem("username");
            const response = await getCustomerByUsername(username);
            setAccountData(response.data.accounts);
        }
        fetchAccounts();
    }, []);

    const navigate = useNavigate();

    const handleOpenTransfer = (content: any) => {
        setModalContent(content);
        setOpen(true);
    }

    const handleCloseTransfer = () => setOpen(false);

    const handleTransfer = async (oid: any, tid: any, amount: any) => {
        if (targetAccount !== "" && amount !== "") {
            const transfer = await transferAccounts(oid, tid, amount);
            if (transfer.status === 200) {
                props.refresh();
                setOpen(false);
            } else {
                console.log("Failed to transfer");
            };
        } else {
            console.log("Please enter a target and amount");
        };
    }

    const handleDepositOrWithdraw = async (aid:any, amount: any) => {
        if (modalContent === "deposit" && amount !== "") {
            const deposit = await depositAccount(aid, amount);
            if (deposit.status === 200) {
                props.refresh();
                setOpen(false);
                setAnchorElMore(null);
            } else {
                console.log("Failed to deposit");
            };
        } else if (modalContent === "withdraw" && amount !== "") {
            const withdraw = await withdrawAccount(aid, amount);
            if (withdraw.status === 200) {
                props.refresh();
                setOpen(false);
                setAnchorElMore(null);
            } else {
                console.log("Failed to withdraw");
            };
        } else {
            console.log("Please enter an amount");
        };
    }

    const handleOpenMore = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorElMore(e.currentTarget);

    const handleCloseMore = () => setAnchorElMore(null);

    const moreOptions = ["Deposit", "Withdraw", "Account details", "Statements", "Account & routing numbers", "Transfer Activity"];

    const creditOptions = ["Account details", "Card benefits", "Request a credit limit increase", "Spending report", "Pay over time"];

    if (props.credit !== "true") {
        return (
            <Container sx={{
                padding: "1em", margin: "0.5em 0", display: "flex",
                flexDirection: "column", gap: "1.5em"
            }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h4 className="accountType">{`${props.type.toUpperCase()} (...00${props.id < 10 ? "0" : ""}${props.id})`}</h4>
                    <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "0.5em" }}>
                        <Button onClick={() => handleOpenTransfer("transfer")} sx={{ color: "var(--blue)", border: "1px solid var(--blue)" }} size="small" variant="outlined">Transfer Money</Button>
                        <Modal
                            open={open}
                            onClose={handleCloseTransfer}
                        >
                            <div className="transferModal">
                                {
                                    modalContent === "transfer" ?
                                        <>
                                            <h5>Transfer To</h5>
                                            <Select
                                                sx={{ width: "80%" }}
                                                label='Target Account'
                                                size='small'
                                                onChange={(e: any) => setTargetAccount(e.target.value)}
                                            >
                                                {
                                                    accountData.map((account: any, i) => {
                                                        return (
                                                            <MenuItem value={account.id} key={i}>{`${account.type.toUpperCase()} (...00${account.id < 10 ? "0" : ""}${account.id})`}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </>
                                        : ""
                                }
                                <h5>Amount</h5>
                                <TextField onChange={(e: any) => setAmount(e.target.value)} sx={{ width: "80%" }} type="number" size="small" />
                                {
                                    modalContent === "transfer" ?
                                    <Button onClick={() => handleTransfer(props.id, targetAccount, amount)}>Transfer</Button>
                                    : 
                                    <Button onClick={() => handleDepositOrWithdraw(props.id, amount)}>{modalContent}</Button>

                                }
                            </div>
                        </Modal>
                        <Button onClick={handleOpenMore} sx={{ color: "var(--blue)", border: "1px solid var(--blue)" }} size="small" variant="outlined">More <ExpandMoreIcon /></Button>
                        <Menu
                            open={Boolean(anchorElMore)}
                            anchorEl={anchorElMore}
                            onClose={handleCloseMore}
                            keepMounted
                            className="menuList"
                        >
                            {
                                moreOptions.map((option, i) => {
                                    if (i === 0) {
                                        return (
                                            <MenuItem onClick={() => handleOpenTransfer("deposit")} key={i}>{option}</MenuItem>
                                        )
                                    }
                                    if (i === 1) {
                                        return (
                                            <MenuItem onClick={() => handleOpenTransfer("withdraw")} key={i}>{option}</MenuItem>
                                        )
                                    }
                                    if (i === moreOptions.length - 1) {
                                        return (
                                            <MenuItem onClick={() => navigate("/transactions")} key={i}>{option}</MenuItem>
                                        )
                                    }
                                    return (
                                        <MenuItem key={i}>{option}</MenuItem>
                                    )
                                })
                            }
                        </Menu>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                    <div className="accountAmounts">
                        <h3>${props.balance}</h3>
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
                    <h4 className="accountType">{`${props.type.toUpperCase()} (...00${props.id < 10 ? "0" : ""}${props.id})`}</h4>
                    <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "0.5em" }}>
                        <Button sx={{ color: "var(--blue)", border: "1px solid var(--blue)" }} size="small" variant="outlined">Make a payment</Button>
                        <Button onClick={handleOpenMore} sx={{ color: "var(--blue)", border: "1px solid var(--blue)" }} size="small" variant="outlined">More <ExpandMoreIcon /></Button>
                        <Menu
                            open={Boolean(anchorElMore)}
                            anchorEl={anchorElMore}
                            onClose={handleCloseMore}
                            keepMounted
                            className="menuList"
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
                        <h3>${props.balance}</h3>
                        <p>Current balance</p>
                    </div>
                    <div className="accountAmounts">
                        <p>Aug {props.id + 2}, 2023</p>
                        <p>Payment due date</p>
                    </div>
                    <div className="accountAmounts">
                        <p>${props.lendingAmount * 0.05}</p>
                        <p>Minimum payment due</p>
                    </div>
                    {
                        props.type === "CREDIT" ?
                            <div className="accountAmounts">
                                <p>${props.lendingAmount}</p>
                                <p>Available credit</p>
                            </div>
                            : ""
                    }
                </Box>
            </Container>
        )
    }
}