import { Platform } from 'react-native';
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

export const loginUser = async (email: string, password: string, rememberMe: boolean) => {
    const res = await axios.post('/auth/login', {
        email,
        password,
        rememberMe
    });
    return res.data;
};

export const getProfile = async () => {
    const res = await axios.get('/users/profile');
    return res.data;
};

export const getAllRti = async () => {
    const res = await axios.get('/rti/all-rti/current-user');
    return res.data;
};

export const getRTIStepOne = async (fullName: string, gender: string, phone: string, email: string, aadharNumber: string) => {
    const res = await axios.post('/rti/step1', {
        fullName,
        gender,
        phone,
        email,
        aadharNumber
    })
    return res.data;
}

export const getRTIStepTwo = async (
    step1Id: string | null,
    data: {
        addressLine1: string;
        addressLine2: string;
        state: string;
        district: string;
        block: string;
        panchayat: string;
        village: string;
        zip: string;
        education: string;
        bpl: boolean;
    }
) => {
    const res = await axios.patch(`/rti/step2/${step1Id}`, data);
    return res.data;
};

export const getRTIStepThree = async (
    step1Id: string | null,
    data: {
        department: string;
        subject: string;
        description: string;
        file: string
        // file?: {
        //     uri: string;
        //     name: string;
        //     type: string;
        // };
    }
) => {
    // const { file, ...rest } = data;
    // const payload = file ? data : rest;

    console.log("Data in API ID ", step1Id);
    console.log("Data in API ", data);


    const res = await axios.patch(`/rti/step3/${step1Id}`, data);
    return res.data;
};