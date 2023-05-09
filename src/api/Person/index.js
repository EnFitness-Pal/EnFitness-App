import axios from "axios";
import { baseURL } from "../../utility";

export function getPerson(id) { 
    return axios.get(`${baseURL}/api/account/${id}`);
}

export function updatePerson(id, FullName, Avatar, Age, Sex, Description, Height, Weight, BodyFat, ActivityLevel, WeightGoal, MacroNutrients) { 
    return axios.put(`${baseURL}/api/account/information/${id}`,
    {
        "FullName": FullName,
        "Avatar": Avatar,
        "Age": Number(Age),
        "Sex": Sex,
        "Description": Description,
        "Height": Number(Height),
        "Weight": Number(Weight),
        "BodyFat": Number(BodyFat),
        "ActivityLevel": Number(ActivityLevel),
        "WeightGoal": Number(WeightGoal),
        "MacroNutrients": Number(MacroNutrients)
    }
);
}