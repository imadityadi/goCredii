import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar';
import * as color from '../strings'
import { basicDetailsFilled, resetState} from '../Redux/Reducer/basicDetailsReducer';
import { useDispatch } from 'react-redux';


const Dashboard = ({navigation}) => {
  const dispatch = useDispatch()
  const signout = () => {
    dispatch(basicDetailsFilled({
      isBasicDetailsFilled: false
    }))
    auth()
    .signOut()
    .then(()=> Snackbar.show({
      text: 'your are signed out',
      textColor: 'white',
      backgroundColor: color.LIGHT_PURP
    }))
    .catch((error) => Snackbar.show({
      text: 'Something went wrong',
      textColor: 'white',
      backgroundColor: color.LIGHT_PURP
    }))
    // .finally(
    
      
    // )
  }

  // handle promise here plsss

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text>This is your dashboard</Text>
      <TouchableOpacity style={{backgroundColor: color.LIGHT_PURP, borderRadius: 10,elevation: 5 }} onPress= {signout}>
        <Text>SignOut</Text> 
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
