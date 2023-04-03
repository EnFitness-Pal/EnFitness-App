import axios from "axios";
import { baseURL } from "../../utility";
import {AxiosContext} from '../../context/AxiosContext';
import { useContext } from "react";

export function signUp(fullname, age, sex, height, weight, bodyfat, activelevel, weightgoal, macronutrients, email, password) {
    return axios.post(`${baseURL}/api/auth/register`,
                {
                    "FullName": fullname,
                    "DateOfBirth": age,      
                    "Sex": sex,      
                    "Description": 'abc',      
                    "Height": height,      
                    "Weight": weight,      
                    "BodyFat": bodyfat,      
                    "ActivityLevel": activelevel,      
                    "WeightGoal": 2,    
                    "MacroNutrients": macronutrients,  
                    "EmailAddress": email,      
                    "Password": password
                });
}