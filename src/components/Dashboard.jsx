import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
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
    MenuItem, Menu, TextField
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FeedIcon from '@mui/icons-material/Feed';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Jobs from "./Jobs";
import JobPost from "./JobPost";
import YourPosts from "./YourPosts";
import Profile from "./Profile";

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [clickYourPost, setClickYourPost] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const userData = localStorage.getItem('userData');

    const navigate = useNavigate();
    useEffect(() => {
        let auth = localStorage.getItem('token');
        if (!auth) {
            navigate("/login")
        }
    }, [])


    const Sidebar = ({ isOpen, toggleSidebar }) => {
        return (
            <Drawer anchor="left" open={isOpen} onClose={toggleSidebar}>
                <List>
                    <ListItem button component={Link} to="/" onClick={() => setClickYourPost(false)}>
                        <DashboardIcon />
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button component={Link} to="/" onClick={() => setClickYourPost(true)}>
                        <FeedIcon />
                        <ListItemText primary="Your Post" />
                    </ListItem>

                </List>
            </Drawer>
        );
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setIsModalOpen(true);
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userData');
        handleMenuClose()
        navigate('/login')
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
        // Implement your search logic here
    };

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
                        Job Board
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
            <Container maxWidth="md" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                {
                    clickYourPost ?
                        <YourPosts/>:
                    <>
                        <JobPost/>
                        <Jobs/>
                    </>

                }
                <Profile userProfile={userData} isOpen={isModalOpen} onClose={handleCloseModal}/>
            </Container>
            <Sidebar isOpen={isSidebarOpen}  toggleSidebar={toggleSidebar} />
        </>
    );
};


export default Layout;
