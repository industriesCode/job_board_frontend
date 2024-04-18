import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import {applyJob, jobList} from "../actions";
import { Button, Container, List, ListItem, ListItemText, Typography, TextField } from '@mui/material';

const Jobs = () => {
    /*
        Displays a list of job listings and provides search functionality. Users can apply for jobs by clicking
        on the "Apply" button.
    */

    // jobs: Stores the array of job listings retrieved from the server.
    // searchValue: Stores the value entered the search input field.
    const [jobs, setJobs] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    // useDispatch: Hook from react-redux used to dispatch actions.
    const dispatch = useDispatch();

    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);

    const getJobList = async () => {
        // Fetches the list of job listings from the server and updates the jobs state.
        const response = await dispatch(jobList());
        setJobs(response);
    };

    const handleApply = async (jobId) => {
        // Handles the "Apply" button click event. Dispatches an action to apply for the selected job.
        await dispatch(applyJob(jobId));
        console.log(`Applying for job with ID: ${jobId}`);
    };

    useEffect(() => {
        getJobList();
    }, []);

    const filteredJobs = jobs.filter((item) =>
        // Filters job listings based on the search input value.
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
