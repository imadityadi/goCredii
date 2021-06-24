import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Pressable,
  Button,
} from 'react-native';
import {ArrowRight} from 'react-native-feather';
import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar';
import * as color from '../strings'
import firestore from '@react-native-firebase/firestore'

import { basicDetailsFilled } from '../Redux/Reducer/basicDetailsReducer';
import { useDispatch } from 'react-redux';


const LoginWithEmail = ({navigation}) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // const userDB = firestore().collection('users')
  // userDB.where('email', '==', email)
  // .get()
  // .then((doc) => console.log(doc) )

 





 const LogIn = () => {
   
  if (!email || !password) {
    Snackbar.show({
      text: 'Please fill all details',
      textColor: 'white',
      backgroundColor: color.BLACK
    })
  } else {
    dispatch(basicDetailsFilled({
      isBasicDetailsFilled : true ,
    }))
    auth().signInWithEmailAndPassword(email, password)
    
    
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/user-not-found') {
        console.log('invalid user')
        Snackbar.show({
                text: 'Invalid User',
                textColor: 'white',
                backgroundColor: color.LIGHT_PURP
              })
      }
      else if (errorCode === 'auth/wrong-password') {
        console.log('Wrong Password')
        Snackbar.show({
          text: 'Wrong Password',
          textColor: 'white',
          backgroundColor: 'red'
        })
      }
      else if (errorCode === 'auth/too-many-requests'){
        Snackbar.show({
          text: 'Please try after some time or change your password',
          textColor: 'white',
          backgroundColor: 'red'
        })
      } else{
        return null
      }
    })
    // .finally()
    // .catch((err) => console.log(err))
  }     
}






  return (
    // first container
    <View style={styles.container}>
      {/* Status Bar */}

      <View style={styles.titleContainer}>
        <Text style={styles.heading}>Hello</Text>
        <Text> Get instant cash for all your needs</Text>
      </View>

      {/* input View */}

        <View style={styles.emailInputView}>
          <TextInput 
            value= {email} 
            style={styles.TextInput} 
            placeholder="Email"
            onChangeText= {(text)=> setEmail(text)}>
            
          </TextInput>
        </View>

      <View style={styles.passwordInputView}>
        <TextInput 
          style={styles.TextInput} 
          placeholder="Password"
          onChangeText= {(text)=> setPassword(text)}
          value={password}>
          
        </TextInput>
      </View>
      <TouchableOpacity style={styles.forgotContainer} onPress= {() => navigation.navigate('ForgotPassword') }>
        <Text style={styles.forgotPassword}>Forgot Password ?</Text>
      </TouchableOpacity>

      {/* Proceed Button */}
      <View
        style={{
          margin: 8,
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 50,
        }}>
        <Text style={styles.proceed}>Sign in</Text>
        <TouchableOpacity
          style={styles.proceedBtn}
          onPress={LogIn}>
          <ArrowRight stroke="white" width={32} height={32} />
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.createNow}>
          Don't Have an Account?
          <TouchableOpacity 
            style={{justifyContent: 'center', alignItems: 'center'}} 
            onPress= {()=>navigation.navigate('phoneAuth')}>
            <Text style={{color: color.LIGHT_PURP}}>Create Now</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default LoginWithEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  heading: {
    fontSize: 55,
    color: 'black',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  heading2: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'poppins',
    top: 30,
    fontWeight: '500',
    marginLeft: 10,
  },
  titleContainer: {
    fontSize: 12,
    fontFamily: 'poppins',
    margin: 20,
    top: 50,
  },

  emailInputView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    height: 55,
    margin: 20,
    top: 60,
    alignItems: 'flex-start',
    shadowOpacity: 1,
    shadowColor: '#000',
    shadowRadius: 1,
    justifyContent: 'center',
  },
  passwordInputView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    height: 55,
    margin: 20,
    top: 40,
    alignItems: 'flex-start',
    shadowOpacity: 1,
    shadowColor: '#000',
    shadowRadius: 1,
    justifyContent: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
  proceedBtn: {
    width: '21%',
    borderRadius: 25,
    backgroundColor: '#9450E7',
    height: 50,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 7,
  },
  proceed: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: 22,
    fontWeight: '600',
    marginLeft: '48%',
  },
  forgotPassword: {
    color: 'grey',
    marginLeft: '22%',
    marginTop: 5

   
  },
  createNow: {
    color: 'grey',
    fontFamily: 'poppins',
    fontWeight: '600',
    textAlign: 'center',
    // bottom: 20,
  
  },
  forgotContainer: {
      width: 200,
      height:30,
      top: 25,
      alignSelf: 'flex-end',
      flexWrap: 'wrap'
  }
});
