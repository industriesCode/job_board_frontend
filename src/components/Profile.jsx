import React from 'react';
import {Modal, Typography, Box, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/*
    Props:
    isOpen: Boolean indicating whether the modal is open or closed.
    onClose: Function to close the modal.
    userProfile: JSON string containing user profile data.
*/
const ProfileModal = ({ isOpen, onClose, userProfile }) => {
    // Renders a modal displaying user profile information.
    const userData = JSON.parse(userProfile);

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{ position: 'relative', bgcolor: 'lightGray', px: 3, py: 4, borderRadius: 1 }}>
                <IconButton onClick={onClose} sx={{ position: 'absolute', top: 0, right: 0, color: 'white' }}>
                    <CloseIcon />
                </IconButton>
                <div>
                    <Typography variant="small">Name: {userData.username}</Typography><br/>
                    <Typography variant="small">Primary Key: {userData.pk}</Typography>
                </div>
            </Box>
        </Modal>
    );
};

export default ProfileModal;
