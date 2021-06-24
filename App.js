import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
// Firebase Imports

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
//  Navigation Imports

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//  Internal Imports

import RNBootSplash from "react-native-bootsplash";
import { StatusBar } from 'react-native';

import AuthStack from './src/Navigations/AuthStack'
import HomeStack from './src/Navigations/HomeStack'
import requestPermissions from './src/utils/AskPermission'
//  Screen Stack
const Stack = createStackNavigator();









const App = ({navigation}) => {
const isBasicDetailsFilled = useSelector(state => state.isBasicDetailsFilled)
const [user, setUser] = useState('')
  

console.log(isBasicDetailsFilled)

  React.useEffect(()=> {
    setTimeout(() =>{
      RNBootSplash.hide();
    }, 300)
  }, [])

   

 useEffect( () => {
   const unsubscribe = auth().onAuthStateChanged(userExist => { 
    // let currentUID = auth().currentUser.uid
    // console.log(currentUID)
    // const userDB = firestore().collection('users').doc(currentUID)
    
    // userDB.get()
    // .then(function(doc) {
    //   if (doc.exists) {
    //     console.log("Document data:", doc.data());
    //     const {isBasicDetailsFilled} = doc.data()
    //     console.log("isBasicDetailsFilled", isBasicDetailsFilled)
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   } 
    // }).catch(function(error) {
    //   console.log("Error getting document:", error);
    // });

    
      if(userExist) {
        setUser(userExist)
      }
      else{
        setUser('')
      }
      return unsubscribe
      requestPermissions()
  })

  
 }, [])
 
 



  return (

    <NavigationContainer>
      <StatusBar hidden={true}/>
      {/* <Stack.Navigator screenOptions={{headerShown: false}}> */}
        {!user? 
        // <>
        <AuthStack/>
        
        
        
      :

      <HomeStack/>
      // <>
      
      // <Stack.Screen name="Dashboard" component={Dashboard}/> 
      // <Stack.Screen name="userDetailsInput"  component={userDetailsInput}/>
      // </>
      
      
      }
      {/* </Stack.Navigator> */}
    </NavigationContainer>

  );
};
      
      
        
          
         



export default App;
