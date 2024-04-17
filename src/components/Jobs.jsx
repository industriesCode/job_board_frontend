import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import {applyJob, jobList} from "../actions";
import { Button, Container, List, ListItem, ListItemText, Typography, TextField } from '@mui/material';

const Jobs = () => {
    const dispatch = useDispatch();
    const [jobs, setJobs] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);

    const getJobList = async () => {
        const response = await dispatch(jobList());
        setJobs(response);
    };

    const handleApply = async (jobId) => {
        // Implement your apply logic here
        await dispatch(applyJob(jobId));
        console.log(`Applying for job with ID: ${jobId}`);
    };

    useEffect(() => {
        getJobList();
    }, []);

    const filteredJobs = jobs.filter((item) =>
        item.company.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.location.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.experience.toLowerCase().includes(searchValue.toLowerCase())
    );


    return (
        <Container maxWidth="md" sx={{ marginTop: '20px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}>
            <TextField
                label="Search By: Company, Title Or Location"
                variant="outlined"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                fullWidth
                sx={{ mb: 2 }} // Add margin bottom for spacing
            />
            <List>
                {filteredJobs.map(item => (
                    <ListItem key={item.id}>
                        <ListItemText primary={item.company} secondary={
                            <React.Fragment>
                                <Typography variant="body2" color="textSecondary">Title: {item.title}</Typography>
                                <Typography variant="body2" color="textSecondary">Location: {item.location}</Typography>
                                <Typography variant="body2" color="textSecondary">Experience: {item.experience} years</Typography>
                            </React.Fragment>
                        } />
                        {userData.pk !== item.created_by ? (
                            <Button variant="contained" onClick={() => handleApply(item.id)}>Apply</Button>
                        ) : null}
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Jobs;
