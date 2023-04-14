import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react'
import { Alert } from 'react-native';
import { forgot, verify } from '../api/Auth/Forgot';
import { signIn } from '../api/Auth/SignIn';
import { signUp} from '../api/Auth/SignUp';

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [userID, setUserID] = useState();
    const [token, setToken] = useState({
        AccessToken: '',
        RefreshToken: '',
    });
    const [TokenExpired, setTokenExpired] = useState();

    const forgotpassword = (email) => { 
        setLoading(true);
        forgot(email)
            .then(res => {
                Alert.alert('Success', 'Please check your email to get new password.');
                setLoading(false);
            }
        ).catch(err => { 
                console.log('err:', err);
                Alert.alert('Error', 'Please check your email again.');
                setLoading(false);
                
            })
    }

    const login = (email,password) => {
        setLoading(true);
        signIn(email, password)
            .then(res => {
                setToken({
                    AccessToken: res.data?.Token,
                    RefreshToken: res.data?.RefreshToken
                });
                setTokenExpired(res.data?.TokenExpired);
                setUserID(res.data?.UserId);
                AsyncStorage.setItem('AccessToken', res.data?.Token);
                AsyncStorage.setItem('RefreshToken', res.data?.RefreshToken);
                AsyncStorage.setItem('TokenExpired', res.data?.TokenExpired);
                AsyncStorage.setItem('UserID', String(res.data?.UserId));
                setLoading(false);  
            })
            .catch(err => {
                console.log('err:', err.response?.data);
                setLoading(false);
                if (err.response.data?.status === 500) {
                    Alert.alert("Login Again", err.response.data?.detail);
                } else { 
                    Alert.alert("Login Error", "Email or password is incorrect");
                }
                // if(err.response.status === 400) {
                //     Alert.alert('Login Error','Email or password is incorrect');
                // }
            })

    }
    const logout = () => { 
        setLoading(true);
        setTimeout(() => { 
        setToken({
            AccessToken: null,
            RefreshToken: null
        });
        setTokenExpired(null);
            AsyncStorage.removeItem('AccessToken');
            AsyncStorage.removeItem('RefreshToken');
            AsyncStorage.removeItem('TokenExpired');
            setLoading(false); 
        },1000)
    }
    const getAccessToken = () => {
        return token.AccessToken;
    };
    const getTokenExpired = () => { 
        return TokenExpired;
    }
    const isLoggedIn = async () => { 
        try {
            setLoading(true);
            let date = new Date();
            let refreshToken = await AsyncStorage.getItem('RefreshToken');
            let accessToken = await AsyncStorage.getItem('AccessToken');
            let tokenExpired = await AsyncStorage.getItem('TokenExpired');
            let userID = await AsyncStorage.getItem('UserID');
            setToken({
                AccessToken: accessToken,
                RefreshToken: refreshToken,
            });
            setUserID(Number(userID));
            setTokenExpired(tokenExpired);
            if (TokenExpired < date.toISOString()) {
                console.log('Token Expired');
                Alert.alert('Too Long!', 'Please login again.')
                logout();
            }
            
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }
    useEffect(() => { 
        isLoggedIn();
    },[])
    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                loading,
                token,
                getAccessToken,
                setToken,
                setLoading,
                forgotpassword,
                userID
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthContext = createContext();
