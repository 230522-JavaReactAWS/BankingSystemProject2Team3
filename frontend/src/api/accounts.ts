import axios from "axios";
import { baseURL } from "./constants";

//GET all accounts
export const getAllAccounts = async () => {
    const response = await axios.get(`${baseURL}/accounts`);
    console.log(response);
    return response;
}