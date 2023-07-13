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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router";
import { getCustomerByUsername } from "../api/customers";
import { useLocation } from "react-router-dom";

export default function NavBar() {
    const [darkMode, setDarkMode] = React.useState(sessionStorage.getItem("darkMode"));
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [user, setUser] = React.useState({ role: "", firstName: "" });

    const location = useLocation();
    
    React.useEffect(() => {
        const fetchUser = async () => {
            const username = sessionStorage.getItem("username");
            const response = await getCustomerByUsername(username);
            setUser({ role: response.data.role.roleTitle, firstName: response.data.firstName });
            if (response.data.role.roleTitle === "Manager" && location.pathname === "/accounts") {
                navigate("/transactions");
            }
            console.log(location.pathname)
        }
        fetchUser();
    }, [location.pathname]);
    

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

    const handleLogout = () => {
        sessionStorage.clear();
        setAnchorElUser(null);
        setUser({ role: "", firstName: "" })
        navigate("/");
    }

    const pages = ["Accounts", "Transactions", "Apply for a Loan"];
    const settings = ["Profile", "Dashboard", "Settings", "Log out"];

    return (
        <AppBar
            className='navbar'
            position='sticky'
            sx={{
                backgroundColor: "var(--orange)", height: "4.5em", padding: "0.1em"
            }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.5em" }} disableGutters>

                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
                            {
                                user.role !== "" ?
                            pages.map((page, i) => {
                                if (i === 0 && user.role === "Manager") return "";
                                if (i === 2 && user.role === "Manager") {
                                    return (
                                        <MenuItem onClick={handleCloseNav} key={i}>
                                            <p onClick={() => navigate(`/${page.split(" ")[0].toLowerCase()}`)}>View Applications</p>
                                        </MenuItem>
                                    )
                                }
                                return (
                                    <MenuItem onClick={handleCloseNav} key={i}>
                                        <p onClick={() => navigate(`/${page.split(" ")[0].toLowerCase()}`)}>{page}</p>
                                    </MenuItem>
                                )
                            })
                            : <MenuItem onClick={handleCloseNav}><p onClick={() => navigate("/")}>Register / Login</p></MenuItem>
                            }
                        </Menu>
                    </Box>

                    <Box sx={{ display: "flex", flexWrap: "nowrap", alignItems: "center", gap: "1em" }}>
                        <a href='/'><img src={navLogo} alt="navLogo" className='navLogo' /></a>
                    </Box>

                    <Box sx={{ display: { xs: "none", md: "flex" }, flexWrap: "nowrap" }}>
                        {
                            user.role !== "" ?
                                pages.map((page, i) => {

                                    if (i === 0 && user.role === "Manager") return "";
                                    if (i === 2 && user.role === "Manager") {
                                        return (
                                            <Button
                                                onClick={() => navigate(`/${page.split(" ")[0].toLowerCase()}`)}
                                                sx={{
                                                    color: "white", fontSize: "1em"
                                                }}
                                                key={i}
                                            >View Applications
                                            </Button>
                                        )
                                    }
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
                                })
                                : <Button
                                    onClick={() => navigate("/")}
                                    sx={{
                                        color: "white", fontSize: "1em"
                                    }}
                                >Register / Login
                                </Button>
                        }

                    </Box>

                    <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
                        <IconButton onClick={handleDarkMode} sx={{ color: "white" }}>
                            {darkMode === "true" ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
                        <Tooltip title="Account settings" arrow>
                            <IconButton onClick={handleOpenUser} size="small">
                                <Avatar sx={{ height: "1.5em", width: "1.5em", backgroundColor: "white", color: "var(--orange)" }}>{user.firstName !== "" ? user.firstName.charAt(0).toUpperCase() : <AccountCircleIcon />}</Avatar>
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
                                if (i === 3) {
                                    return (
                                        <MenuItem onClick={handleLogout} key={i}>{setting}</MenuItem>
                                    )
                                }
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