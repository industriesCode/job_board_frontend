import React, { useState } from 'react';
import { TextField, Button, Grid, Container } from '@mui/material';
import {createJobPost, jobList} from "../actions";
import {useDispatch} from "react-redux";

const JobForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        description: '',
        location: '',
        experience: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await dispatch(createJobPost(formData));
        console.log(response)
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: '20px', marginBottom: '20px' }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Post
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </Container>
    );
};

export default JobForm;
