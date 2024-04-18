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
    //  Provides the main layout for the application, including the app bar, sidebar, and content area.

    // Stores the state of the sidebar (open/close).
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // Stores the anchor element for the profile menu.
    const [anchorEl, setAnchorEl] = useState(null);
    // Stores the state of whether the "Your Post" section is clicked or not.
    const [clickYourPost, setClickYourPost] = useState(false)
    // Stores the state of the profile modal (open/close).
    const [isModalOpen, setIsModalOpen] = useState(false);
    //  Stores the value entered the search input field.
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
        // Toggles the state of the sidebar.
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleMenuOpen = (event) => {
        // Handles opening the profile menu.
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        //  Handles closing the profile menu and opening the profile modal.
        setIsModalOpen(true);
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Handles the logout process by removing tokens and user data from local storage and redirecting to the login page.
        localStorage.removeItem('token')
        localStorage.removeItem('userData');
        handleMenuClose()
        navigate('/login')
    }

    const handleCloseModal = () => {
        //  Handles closing the profile modal.
        setIsModalOpen(false);
    };


    const handleSearchChange = (event) => {
        // Updates the search value when the user types in the search input field.
        setSearchValue(event.target.value);
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
