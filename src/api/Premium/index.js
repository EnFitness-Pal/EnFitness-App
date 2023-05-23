import axios from "axios";
import { baseURL } from "../../utility";

export function getPremiumAPI(id) { 
    return axios.get(`${baseURL}/api/transaction/${id}`);
}

export function updatePremiumAPI(id, PaypalToken, ExpirationDate, Money) { 
    return axios.put(`${baseURL}/api/transaction/${id}`,
    {
        "PaypalToken": PaypalToken,
        "ExpirationDate": ExpirationDate,
        "Money": Money
    });
}

export function restorePremiumAPI(id) { 
    return axios.post(`${baseURL}/api/transaction/${id}`,
    {
        "PaypalToken": null,
        "ExpirationDate": null,
        "Money": null
    });
}