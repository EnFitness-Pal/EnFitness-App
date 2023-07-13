import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SexScreen from '../../screens/Infomation/SexScreen'
import AgeScreen from '../../screens/Infomation/AgeScreen'
import WeightScreen from '../../screens/Infomation/WeightScreen'
import HeightScreen from '../../screens/Infomation/HeightScreen'
import GoalScreen from '../../screens/Infomation/GoalScreen'
import BaselineScreen from '../../screens/Infomation/BaselineScreen'
import GWScreen from '../../screens/Infomation/GWScreen'
import BFScreen from '../../screens/Infomation/BFScreen'
import Slider from '../../components/Slider';
import MacroNutrients from '../../screens/Infomation/MacroNutrients';
import LoginNav from '../LoginNav';
import ForgotScreen from '../../screens/ForgotScreen';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import VerifyScreen from '../../screens/VerifyScreen';
import ConfirmPass from '../../screens/ConfirmPass';
const Stack = createNativeStackNavigator();
const InfoNavigation = () => {
    const lauch = useSelector((state) => state.state.lauch);
    
    return (
        
        <Stack.Navigator>
            {!lauch?
                <Stack.Screen options={{ headerShown: false }} name="GettingStarted" component={Slider} />:<></>
            }
            <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginNav} />
            <Stack.Screen options={{ headerShown: false }} name="SexScreen" component={SexScreen} />
            <Stack.Screen options={{ headerShown: false }} name="AgeScreen" component={AgeScreen} />
            <Stack.Screen options={{ headerShown: false }} name="WeightScreen" component={WeightScreen} />
            <Stack.Screen options={{ headerShown: false }} name="HeightScreen" component={HeightScreen} />
            <Stack.Screen options={{ headerShown: false }} name="GoalScreen" component={GoalScreen} />
            <Stack.Screen options={{ headerShown: false }} name="BaselineScreen" component={BaselineScreen} />
            <Stack.Screen options={{ headerShown: false }} name="GWScreen" component={GWScreen} />
            <Stack.Screen options={{ headerShown: false }} name="BFScreen" component={BFScreen} />
            <Stack.Screen options={{ headerShown: false }} name="MacroNutrients" component={MacroNutrients} />
            <Stack.Screen options={{ headerShown: false}} name="Loging" component={LoginNav} />
            <Stack.Screen options={{ headerShown: false }} name="Forgot" component={ForgotScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Verify" component={VerifyScreen} />
            <Stack.Screen options={{ headerShown: false }} name="ConfirmPass" component={ConfirmPass} />
        </Stack.Navigator>
    )
}

export default InfoNavigation