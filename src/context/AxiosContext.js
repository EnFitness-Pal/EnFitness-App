import React, {createContext, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import { baseURL } from '../utility';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AxiosContext = createContext();
const { Provider } = AxiosContext;

export const AxiosProvider = ({ children }) => {
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
            const authToken = AsyncStorage.getItem('AccessToken');
            console.log(authToken);
            request.headers.Authorization = `Bearer ${authToken}`;
        }
        let date = new Date();
        const decodedAccessToken = jwt_decode(authContext.getAccessToken(), { header: true });
        const expireInToken = decodedAccessToken.exp;
        console.log(expireInToken);
        console.log(date.getTime() / 1000);
        if (expireInToken > date.getTime() / 1000) return request;
        const refreshToken = await AsyncStorage.getItem('RefreshToken');
        const data = {
            AccessToken: authContext.token.AccessToken,
            RefreshToken: authContext.token.RefreshToken,
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
            await AsyncStorage.setItem('AccessToken', response?.data?.Value?.Token);
            
            AsyncStorage.setItem(
                'RefreshToken',
                response?.data?.Value?.RefreshToken,
            );
                authContext.setToken({
                    AccessToken: response?.data?.Value?.Token,
                    RefreshToken: response?.data?.Value?.RefreshToken,
            })
            return request;
            })
            .catch(error => {
            console.log(error);
            return request;
            });
        return request;
    });
    

    return (
        <Provider
            value={{
                authAxios,
                publicAxios,
                axiosInstance
            }}>
            {children}
        </Provider>
    );
  
};

