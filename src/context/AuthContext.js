import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react'
import { signIn } from '../api/Auth/SignIn';


export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    
    const login = (email,password) => {
        setLoading(true);
        setTimeout(() => { 
        signIn(email, password)
            .then(res => {
                setUserToken(res.data.Token);
                AsyncStorage.setItem('userToken', res.data.Token);
                setLoading(false);  
            })
            .catch(err => { console.log('err:', err); })
        },1000)

    }
    const logout = () => { 
        setLoading(true);
        setTimeout(() => { 
            setUserToken(null);
            AsyncStorage.removeItem('userToken');
            setLoading(false); 
        },1000)
    }
    const isLoggedIn = async () => { 
        try {
            setLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => { 
        isLoggedIn();
    },[])
    return (
        <AuthContext.Provider value={{login, logout, loading, userToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthContext = createContext();