import axios from 'axios';

export const signin = (username, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8000/api/login/', { username, password });
        return response.data
    } catch (error) {
        console.error('Login failed:', error.response.data);
    }
};

export const signup = (username, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8000/api/signup/', { username, password });
        return response.data
    } catch (error) {
        console.error('Signup failed:', error.response.data);
    }
};
