import axios from "axios";
import { baseURL } from "./constants";

const token = sessionStorage.getItem("token");

//Get customer by ID
export const getCustomerById = async (id: number) => {
    const response = await axios.get(
        `${baseURL}/customers/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    return response;
};

//Get customer by username
export const getCustomerByUsername = async (username: any) => {
    const response = await axios.get(
        `${baseURL}/customers/user/${username}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    return response;
};

//Get Accounts by Customer ID
export const getAccountsByCustomerId = async (id: number) => {
    const response = await axios.get(
        `${baseURL}/customers/${id}/accounts`,
        { headers: { Authorization: `Bearer ${token}`}}
        );
    console.log(response);
    return response;
};