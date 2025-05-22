import axios from './axios';

export const registerUser = async (name: string, email: string, mobileNumber: string, password: string) => {
    const res = await axios.post('/auth/register', {
        fullname: name,
        email,
        phone: mobileNumber,
        password
    });
    return res.data;
};

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post('/auth/register', {
        email,
        password
    });
    return res.data;
};

export const getProfile = async () => {
    const res = await axios.get('/users/profile');
    return res.data;
};