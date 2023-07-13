import axios from "axios";
import { baseURL } from "./constants";

const token = sessionStorage.getItem("token");

//GET all transactions
export const getAllTransactions = async () => {
    const response = await axios.get(`${baseURL}/transactions`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    return response;
}

//Open new account, pass in type and amount
export const openNewAccount = async (type: any, amount: any) => {
    const response = await axios.post(
        `${baseURL}/transactions/open/${type}/${amount}`,
        "",
        { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    return response;
}

//Deposit into account, pass in account ID and amount
export const depositAccount = async (aid: any, amount: any) => {
    const response = await axios.post(
        `${baseURL}/transactions/deposit/${aid}/${amount}`,
        "",
        { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    return response;
}

//Withdraw from account, pass in account ID and amount
export const withdrawAccount = async (aid: any, amount: any) => {
    const response = await axios.post(
        `${baseURL}/transactions/withdrawal/${aid}/${amount}`,
        "",
        { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    return response;
}

//Transfer money between accounts, pass in origin account ID, target account ID, and amount
export const transferAccounts = async (oid: any, tid: any, amount: any) => {
    const response = await axios.post(
        `${baseURL}/transactions/transfer/${oid}/${tid}/${amount}`,
        "",
        { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    return response;
}

//Status update, pass in account ID and new status name(Approved/Denied)
export const updateAccountStatus = async (aid: any, status: any) => {
    const response = await axios.post(
        `${baseURL}/transactions/status/${aid}/${status}`,
        "",
        { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    return response;
}