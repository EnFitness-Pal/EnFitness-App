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

    useEffect(() => { 
        axiosInstance.interceptors.request.use(async (request) => {
        if (!authContext.getAccessToken()) {
            const authToken = await AsyncStorage.getItem('AccessToken');
            console.log(authToken);
            request.headers.Authorization = `Bearer ${authToken}`;
        }
        const authToken1 = await AsyncStorage.getItem('AccessToken');

        let date = new Date();
        const decodedAccessToken = jwt_decode(authToken1);
        const expireInToken = decodedAccessToken.exp;
        // console.log(expireInToken > date.getTime() / 1000);
        // console.log(expireInToken);
        // console.log(date.getTime() / 1000);
        if (expireInToken > date.getTime() / 1000) {
            return request;
        }
        else {
            const refreshToken = await AsyncStorage.getItem('RefreshToken');
            const accessToken = await AsyncStorage.getItem('AccessToken');
            const data = {
                "AccessToken": accessToken,
                "RefreshToken": refreshToken,
            };

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${baseURL}/api/token/refresh`,
                headers: {
                Authorization: `Bearer ${refreshToken}`,
                },
                data: data,
            };
            await axios
                .request(config)
                .then(async response => {
                console.log("responseAxios",response?.data);
                await AsyncStorage.setItem('AccessToken', response?.data?.Value?.Token);
                await AsyncStorage.setItem(
                    'RefreshToken',
                    response?.data?.Value?.RefreshToken,
                );
                authContext.setToken({
                        AccessToken: response?.data?.Value?.Token,
                        RefreshToken: response?.data?.Value?.RefreshToken,
                })
                request.headers.Authorization = `Bearer ${response?.data?.Value?.Token}`;
                return request;
                })
                .catch(error => {
                console.log("errorAxios",error.response.data);
                return request;
                });
            return request;            
        }

    });
    });

    
    
    const getPersonStack = async (id) => {
        await axiosInstance.get(`/api/account/${id}`)
            .then(res => {
                setPerson(res?.data);
            })
            .catch(err => {
                console.log('err:', err);
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

    return (
        <Provider
            value={{
                authAxios,
                publicAxios,
                axiosInstance,
                person,
                getPersonStack,
                updatePerson
            }}>
            {children}
        </Provider>
    );
  
};

