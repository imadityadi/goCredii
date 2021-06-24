import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth'
import * as color from '../strings'
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore'



 const OTP = ({ route, navigation }) => {
    const [code, setCode] = useState('')
    const [verified, setVerified] = useState(false)
    
    const {confirmation} = route.params
    const {Phone} = route.params
    const {firstName} = route.params
    const {lastName} = route.params
    const {email} = route.params
    const {password} = route.params

    const verifyCode = async () => {
            // const firstName = JSON.stringify(FirstName)
            // const lastName = JSON.stringify(LastName)
            // const phone= JSON.stringify(Phone)
            // const Confirmation = JSON.stringify(confirmation)
            // const email = JSON.stringify(Email)
            // const password = JSON.stringify(Password)
           
           
           
           
             console.log(`phone number : ${Phone}`)
             console.log(`confirmation : ${confirmation}`)
             console.log(`first name : ${firstName}`)
             console.log(`last name : ${lastName}`)
             console.log(`last name : ${email}`)
             console.log(`last name : ${password}`)

             console.log(confirmation)
             console.log(firstName)
             console.log(lastName)
             console.log(email)
             console.log(password)
             console.log(Phone)

           
            
            

      
      
        if(code == ''){
          Snackbar.show({
            text: 'Please Enter Code',
            backgroundColor: color.BLACK_SHADE,
            textColor: 'white'
            
          })
        } else{

          try {
            await confirmation.confirm(code);
          } catch (error) {
            console.log(error);
          }

          var credential = firebase.auth.PhoneAuthProvider.credential(confirmation.verificationId, code);
      
      const signin = () =>{  
        firebase.auth().signInWithCredential(credential);  
        Snackbar.show({
          text: 'Verified',
            backgroundColor: color.LIGHT_PURP,
            textColor: 'white'
        })
      }
          signin()

        
        // console.log(`current user: ${firebase.auth().currentUser}`)
        
        // // const linkWithEmail = () => {  
        //  try {
        //   auth().currentUser.linkWithCredential(email, password)
        //  } catch (error) {
        //    console.log(error)
        //  } 
         
       
        // }
       
        // linkWithEmail()
       
        
         

// setting user to firestore

      const ref =  firestore().collection('users')

         try {
          ref.add({
            firstName: {firstName},
            lastName: {lastName},
            phoneNum: {Phone}
          })
          console.log('data set to firestore')
         } catch (error) {
           console.log(error)
         } 
          



        }
        
      }
 

    return (
    <View style={styles.container}> 
        <View style={styles.headingContainer}><Text style={styles.heading}>Enter OTP to Verify</Text></View>      
        <View style={styles.inputContainer}><TextInput placeholder='######' value={code} onChangeText={(text)=> setCode(text)}></TextInput></View>  
          
        <TouchableOpacity onPress={verifyCode}  style={styles.verifyBtn}><Text style={{color: 'white', fontSize: 18}}>Verify</Text></TouchableOpacity>
    </View>

      );
 }




 export default OTP

 const styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: color.BACKGROUNDC

   },

   heading: {
    fontSize: 25,
    color: color.BLACK_SHADE,
    fontFamily: 'Helvetica',
    fontWeight: '500',
  },

  headingContainer:{
        fontSize: 12,
        fontFamily: 'poppins',
        margin: 20,
        top: 50,
       }, 
    inputContainer:{
           width: '90%',
           height: 50,
           backgroundColor: 'white',
           borderRadius: 10,
           justifyContent: 'center',
           alignItems: 'center',
           alignSelf: 'center'
       },
    
    verifyBtn:  {
    width: '90%',
    borderRadius: 10,
    backgroundColor: color.LIGHT_PURP,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    marginTop: 80,
    marginLeft: 20
    },

    moboLogin:{
        width: 200,
        height: 150,
        alignSelf: 'center'
    }
       
 })

