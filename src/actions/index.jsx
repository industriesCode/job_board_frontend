import axios from 'axios';

// Retrieve token from local storage
const token = localStorage.getItem('token');

export const signin = (username, password) => async (dispatch) => {
    /*
        signin:
            Purpose: Sends a POST request to the login endpoint with provided username and password.
            Returns: The data received from the server upon successful login.
            Error Handling: Logs any errors and their corresponding responses.
    */
    try {
        const response = await axios.post('http://localhost:8000/api/login/', { username, password });
        return response.data
    } catch (error) {
        console.error('Login failed:', error.response.data);
    }
};

export const signup = (username, password) => async (dispatch) => {
    /*
        signup:
            Purpose: Sends a POST request to the signup endpoint with provided username and password.
            Returns: The data received from the server upon successful signup.
            Error Handling: Logs any errors and their corresponding responses.
    */
    try {
        const response = await axios.post('http://localhost:8000/api/signup/', { username, password });
        return response.data
    } catch (error) {
        console.error('Signup failed:', error.response.data);
    }
};

export const jobList = () => async (dispatch) => {
    /*
        jobList:
            Purpose: Sends a GET request to retrieve all job listings.
            Returns: The data received from the server containing job listings.
            Authorization: Includes the token retrieved from local storage in the request headers.
            Error Handling: Logs any errors and their corresponding responses.
    */
    try {
        const response = await axios.get('http://localhost:8000/api/jobs/all/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });
        return response.data
    } catch (error) {
        console.error('Retrieve failed:', error.response.data);
    }
};


export const userJobList = () => async (dispatch) => {
    /*
        userJobList:
            Purpose: Sends a GET request to retrieve job listings created by the authenticated user.
            Returns: The data received from the server containing job listings.
            Authorization: Includes the token retrieved from local storage in the request headers.
            Error Handling: Logs any errors and their corresponding responses.
    */
    try {
        const response = await axios.get('http://localhost:8000/api/jobs/user/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });
        return response.data
    } catch (error) {
        console.error('Retrieve failed:', error.response.data);
    }
};



export const createJobPost = (data) => async (dispatch) => {
    /*
        createJobPost:
            Purpose: Sends a POST request to create a new job post.
            Data: Takes data as input, likely containing details of the job post.
            Returns: The data received from the server upon successful creation of the job post.
            Error Handling: Logs any errors and their corresponding responses.
    */
    try {
        const response = await axios.post('http://localhost:8000/api/jobs/', data);
        return response.data
    } catch (error) {
        console.error('Job Post failed:', error.response.data);
    }
};


export const applyJob = (jobId) => async (dispatch) => {
    /*
        applyJob:
            Purpose: Sends a PUT request to apply for a job by its ID.
            Returns: The data received from the server upon successful application to the job.
            Authorization: Includes the token retrieved from local storage in the request headers.
            Error Handling: Logs any errors and their corresponding responses.
    */
    try {
        const response = await axios.put(`http://localhost:8000/api/jobs/${jobId}/`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });
        return response.data
    } catch (error) {
        console.error('Retrieve failed:', error.response.data);
    }
};

