import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Container,
    MenuItem, Menu
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';



const Dashboard = () => {
    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Dashboard
            </Typography>
            <Typography variant="body1">
                Welcome to the Dashboard.
            </Typography>
        </Container>
    );
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <Drawer anchor="left" open={isOpen} onClose={toggleSidebar}>
            <List>
                <ListItem button component={Link} to="/">
                    <DashboardIcon />
                    <ListItemText primary="Dashboard" />
                </ListItem>
            </List>
        </Drawer>
    );
};

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        let auth = localStorage.getItem('token');
        if (!auth) {
            navigate("/login")
        }
    }, [])

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token')
        handleMenuClose()
        navigate('/login')
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleSidebar}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        My App
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="profile"
                        aria-controls="profile-menu"
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                        style={{ marginLeft: 'auto' }}
                    >
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <h3>Hi, welcome to the Dashboard</h3>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </>
    );
};


export default Layout;
