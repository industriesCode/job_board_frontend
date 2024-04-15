import React, { useEffect, useState } from 'react';
import {Container} from "@mui/material";
import {userJobList} from "../actions";
import {useDispatch} from "react-redux";

const JobPosts = () => {
    const dispatch = useDispatch();
    const [myPosts, setMyPosts] = useState([]);

    const getYourPost = async () => {
        const response = await dispatch(userJobList());
        setMyPosts(response);
    };

    useEffect(() => {
        getYourPost();
    }, []);

    return (
        <Container maxWidth="md" sx={{ marginTop: '20px', marginBottom: '20px', padding:'10px',  backgroundColor: 'lightGray', border: '1px solid #ccc', borderRadius: '5px'}}>

            <h2>Your Posts</h2>
            <ul>
                {myPosts.map(post => (
                    <li style={{marginTop: '20px', marginBottom: '20px', padding:'10px',  backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px'}} key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                        <p>Location: {post.location}</p>
                        <p>Experience: {post.experience} years</p>
                        <p>Number of applicants: {post.applicants.length}</p>
                        <ul>
                            {post.applicants.map(applicant => (
                                <li key={applicant.id}>{applicant.username}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default JobPosts;
