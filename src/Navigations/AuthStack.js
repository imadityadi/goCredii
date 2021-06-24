import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import React from 'react'

//screen imports

import ForgotPassword from '../screens/ForgotPassword'
import LoginWithEmail from '../screens/LoginWithEmail';
import PhoneAuth from '../feature/phoneAuth'
import OTP from '../screens/OTP';

const Stack = createStackNavigator()
const AuthStack = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={LoginWithEmail}>
            <Stack.Screen component={LoginWithEmail} name= 'LoginWithEmail'/>
            <Stack.Screen component={PhoneAuth} name= 'phoneAuth'/>
            <Stack.Screen component={ForgotPassword} name= 'ForgotPassword'/>
            <Stack.Screen component={OTP} name= 'OTP'/>
        </Stack.Navigator>
    )

}

export default AuthStack;
