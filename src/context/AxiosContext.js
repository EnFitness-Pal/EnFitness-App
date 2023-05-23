import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import { baseURL } from '../utility';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AxiosContext = createContext();
const { Provider } = AxiosContext;

export const AxiosProvider = ({ children }) => {
    const [person, setPerson] = useState([]);
    const [loading, setLoading] = useState(false);
    const authContext = useContext(AuthContext);
    const authAxios = axios.create({
        baseURL: baseURL,
    });

    const publicAxios = axios.create({
        baseURL: baseURL,
    });

    const axiosInstance = axios.create({
        baseURL,
        headers: {Authorization: `Bearer ${authContext.getAccessToken()}`},
    });

    axiosInstance.interceptors.request.use(async (request) => {
        if (!authContext.getAccessToken()) {
            const authToken = await AsyncStorage.getItem('AccessToken');
            console.log(authToken);
            request.headers.Authorization = `Bearer ${authToken}`;
        }
        const authToken1 = await AsyncStorage.getItem('AccessToken');
        const refreshToken1 = await AsyncStorage.getItem('RefreshToken');
        // console.log("authTokenavc", authToken1);
        // console.log("refreshTokenavc", refreshToken1);
        let date = new Date();
        const decodedAccessToken = jwt_decode(authToken1);
        const expireInToken = decodedAccessToken.exp;
        // console.log(expireInToken > date.getTime() / 1000);
        // console.log(expireInToken);
        // console.log(date.getTime() / 1000);
        if (expireInToken > date.getTime() / 1000) {
            // console.log("token chua het han",request);
            return request;
        }
        else {
            const data = {
                "AccessToken": authToken1,
                "RefreshToken": refreshToken1
            };

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${baseURL}/api/token/refresh`,
                headers: {
                Authorization: `Bearer ${authToken1}`,
                },
                data
            };
            await axios
                .request(config)
                .then(response => {
                // console.log("responseAxios",response?.data);
                AsyncStorage.setItem('AccessToken', response?.data?.Value?.Token);
                AsyncStorage.setItem(
                    'RefreshToken',
                    response?.data?.Value?.RefreshToken,
                );
                authContext.setToken({
                        AccessToken: response?.data?.Value?.Token,
                        RefreshToken: response?.data?.Value?.RefreshToken,
                })
                console.log('authContext1',authContext.token.AccessToken);
                console.log('authContext1',authContext.token.RefreshToken);
                request.headers.Authorization = `Bearer ${response?.data?.Value?.Token}`;
                return request;
                })
                .catch(error => {
                // console.log("errorAxios",error.response);
                return request;
                });
            return request;            
        }

    });

    
    
    const getPersonStack = async (id) => {
        setLoading(true);
        await axiosInstance.get(`/api/account/${id}`)
            .then(res => {
                setPerson(res?.data);
                setLoading(false);
            })
            .catch(err => {
                console.log('err:', err);
                setLoading(false);
            })
    }

    function updatePerson(id, FullName, Avatar, Age, Sex, Description, Height, Weight, BodyFat, ActivityLevel, WeightGoal, MacroNutrients) { 
            return axiosInstance.put(`/api/account/information/${id}`,
            {
                "FullName": FullName,
                "Avatar": Avatar,
                "Age": Age,
                "Sex": Sex,
                "Description": Description,
                "Height": Height,
                "Weight": Weight,
                "BodyFat": BodyFat,
                "ActivityLevel": ActivityLevel,
                "WeightGoal": WeightGoal,
                "MacroNutrients": MacroNutrients
            });
        }

    function putPaypal(id, PaypalToken, ExpirationDate, Money) {
        return axiosInstance.put(`/api/account/paypal/${id}`,
        {
            "PaypalToken": PaypalToken,
            "ExpirationDate": ExpirationDate,
            "Money": Money
        });
    }
    
    function getAllExercise(text) {
        return axiosInstance.get(`/api/exercise-admin?PageNumber=1&PageSize=20&exerciseName=${text}`);
    }

    function getExerciseAdmin() {
        return axiosInstance.get(`/api/exercise-admin?PageNumber=1&PageSize=5`);
    }

    function createPlan(id, data) {
        return axiosInstance.post(`/api/plan/${id}`, data)
    }

    useEffect(() => { 
        getPersonStack(authContext.userID);
    },[])

    return (
        <Provider
            value={{
                authAxios,
                publicAxios,
                axiosInstance,
                person,
                getPersonStack,
                updatePerson,
                putPaypal,
                loading,
                getAllExercise,
                getExerciseAdmin,
                createPlan
            }}>
            {children}
        </Provider>
    );
  
};

