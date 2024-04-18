import React, { useState } from 'react';
import { TextField, Button, Grid, Container } from '@mui/material';
import { createJobPost } from "../actions";
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';

const JobForm = () => {
    // Renders a form for posting job listings.

    const dispatch = useDispatch();
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);

    // Stores the data entered into the form fields.
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        description: '',
        location: '',
        experience: '',
        created_by: userData.pk
    });

    const handleChange = (event) => {
        //  Updates the formData state when the value of any form field changes.
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const { reset } = useForm();
    const handleSubmit = async (event) => {
        /*
            Handles the form submission event. Dispatches a createJobPost action with the form data.

            Retrieves user data from local storage to set the created_by field in the form data.
            Resets the form after submission using reset from react-hook-form.
        */
        event.preventDefault();
        await dispatch(createJobPost(formData));
        reset();
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: '20px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}>
            <h4>Post Your Job</h4>
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
