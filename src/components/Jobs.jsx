import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {jobList} from "../actions";
import {Button, Container, List, ListItem, ListItemText, Typography} from '@mui/material';



const Jobs = () => {
    const dispatch = useDispatch();
    const [jobs, setJobs] = useState([]);

    const getJobList = async () => {
        const response = await dispatch(jobList());
        setJobs(response);
    };

    const handleApply = (jobId: number) => {
        // Implement your apply logic here
        console.log(`Applying for job with ID: ${jobId}`);
    };

    useEffect( () => {
        getJobList()
    },[]);

    return (
        <Container maxWidth="md" sx={{ marginTop: '20px', marginBottom: '20px' }}>
            <List>
                {jobs.map(item => (
                    <ListItem key={item.id}>
                        <ListItemText primary={item.company} secondary={
                            <React.Fragment>
                                <Typography variant="body2" color="textSecondary">Title: {item.title}</Typography>
                                <Typography variant="body2" color="textSecondary">Location: {item.location}</Typography>
                                <Typography variant="body2" color="textSecondary">Experience: {item.experience} years</Typography>
                            </React.Fragment>
                        }/>
                        <Button variant="contained" onClick={() => handleApply(item.id)}>Apply</Button>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Jobs;
