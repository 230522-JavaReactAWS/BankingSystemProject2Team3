import React from "react";
import "../css/dashboard.css";
import {
    Container, AppBar, Toolbar,
    Box, Button, IconButton, 
    Avatar, Tooltip, Menu, 
    MenuItem
} from '@mui/material';
import navLogo from "../assets/logoNav.png";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router";

export default function NavBar() {
    const [darkMode, setDarkMode] = React.useState(sessionStorage.getItem("darkMode"));
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleDarkMode = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (darkMode === "false" || darkMode === null) {
            document.querySelector("body")?.classList.add("dark");
            sessionStorage.setItem("darkMode", "true");
            setDarkMode("true")
        } else if (darkMode === "true") {
            document.querySelector("body")?.classList.remove("dark");
            sessionStorage.setItem("darkMode", "false");
            setDarkMode("false");
        }
    };

    const handleOpenUser = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorElUser(e.currentTarget);

    const handleOpenNav = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorElNav(e.currentTarget);

    const handleCloseUser = () => setAnchorElUser(null);

    const handleCloseNav = () => setAnchorElNav(null);

    const navigate = useNavigate();

    const pages = ["Accounts", "Transactions", "Apply for a Loan"];
    const settings = ["Profile", "Dashboard", "Settings"];

    return (
        <AppBar
                className='navbar'
                position='sticky'
                sx={{
                    backgroundColor: "var(--orange)", height: "4.5em", padding: "0.1em"
                }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.5em" }} disableGutters>

                        <Box sx={{display: {xs: "flex", md: "none"}}}>
                            <IconButton onClick={handleOpenNav} sx={{ color: "white" }}>
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                open={Boolean(anchorElNav)}
                                anchorEl={anchorElNav}
                                onClose={handleCloseNav}
                                keepMounted
                                className="menuList"
                            >
                                {pages.map((page, i) => (
                                    <MenuItem onClick={handleCloseNav} key={i}>
                                        <a style={{textDecoration: "none", color: "black"}} onClick={() => navigate(`/${page.split(" ")[0].toLowerCase()}`)}>{page}</a>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Box sx={{ display: "flex", flexWrap: "nowrap", alignItems: "center", gap: "1em" }}>
                            <a href='/'><img src={navLogo} alt="navLogo" className='navLogo' /></a>
                        </Box>

                        <Box sx={{ display: { xs: "none", md: "flex" }, flexWrap: "nowrap" }}>
                            {pages.map((page, i) => {
                                return (
                                    <Button
                                        onClick={() => navigate(`/${page.split(" ")[0].toLowerCase()}`)}
                                        sx={{
                                            color: "white", fontSize: "1em"
                                        }}
                                        key={i}
                                    >{page}
                                    </Button>
                                )
                            })}
                        </Box>

                        <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
                            <IconButton onClick={handleDarkMode} sx={{ color: "white" }}>
                                {darkMode === "true" ? <LightModeIcon /> : <DarkModeIcon />}
                            </IconButton>
                            <Tooltip title="Account settings" arrow>
                                <IconButton onClick={handleOpenUser} size="small">
                                    <Avatar sx={{ height: "1.5em", width: "1.5em", backgroundColor: "white", color: "var(--orange)" }} alt="Rafael Lopez" src="">R</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                open={Boolean(anchorElUser)}
                                anchorEl={anchorElUser}
                                onClose={handleCloseUser}
                                keepMounted
                                className="menuList"
                            >
                                {settings.map((setting, i) => {
                                    return (
                                        <MenuItem onClick={handleCloseUser} key={i}>{setting}</MenuItem>
                                    )
                                })}
                            </Menu>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>
    )
}