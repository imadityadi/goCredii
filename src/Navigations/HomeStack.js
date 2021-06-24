import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'
//screen imports

import Dashboard from '../screens/Dashboard';
import userDetailsInput from '../screens/userDetailsInput';
import UploadDocuments from '../screens/uploadDocuments'


const Stack = createStackNavigator()

const HomeStack = () => {

    
const  isBasicDetailsFilled = useSelector(store => store.basicDetailsReducer.isBasicDetailsFilled)

 console.log('iska', isBasicDetailsFilled)

    return(
        <Stack.Navigator screenOptions={{headerShown: false}} >
            {isBasicDetailsFilled?  
                <Stack.Screen component={Dashboard} name= 'Dashboard'/>
                :
                 <>
                 {/* <Stack.Screen component={Dashboard} name= 'Dashboard'/> */}
                <Stack.Screen component={userDetailsInput} name= 'userDetailsInput'/>
                <Stack.Screen component={UploadDocuments} name= 'UploadDocuments'/>
                </>
                 }
        </Stack.Navigator>
    )

}

export default HomeStack
            
           
            
