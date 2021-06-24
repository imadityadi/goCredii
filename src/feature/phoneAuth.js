import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
import { 
        View, 
        Text, 
        TextInput, 
        StyleSheet, 
        Image, 
        TouchableOpacity, 
        SafeAreaView, 
        ScrollView,
        ToastAndroid, 
        StatusBar
      } from 'react-native';
import * as color from '../strings'
import {ArrowRight} from 'react-native-feather';
import firestore from '@react-native-firebase/firestore'
import Snackbar from 'react-native-snackbar';
import LinearGradient from 'react-native-linear-gradient';
import {createUser} from '../Redux/Reducer/createUserReducer'

const phoneAuth = () => { 
  const [confirmed, setConfirmed] = useState(false)
  const [phone, setPhone] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showNext, setShowNext] = useState(true)
  const [showLinkPage, setLinkPage] = useState(false)
  const phoneNum = `+91${phone}`
  const [code, setCode] = useState('')
  const [result, setResult] = useState('')
  const [CurrentUserUid, setCurrentUserUid] = useState('')
  
    

  const   dispatch = useDispatch()
  


    const onNextButtonClicked = async () => {
    

      // useEffect(() => requestPermission(), [])

      if (!email || !password || !phone) {
        Snackbar.show({
          text: 'Please Fill all Details',
          textColor: 'white',
          backgroundColor: color.LIGHT_PURP
      })
      } else if (password.length < 6){
        Snackbar.show({
          text: 'Password Must be of six digits',
          textColor: 'white',
          backgroundColor: color.LIGHT_PURP
      })


      }   
      
      
      else  {
      
          const confirmation = await auth().signInWithPhoneNumber(phoneNum);
          setResult(confirmation);
          
            console.log('sending code...')
            Snackbar.show({
              text: 'Sending Code',
              textColor: 'white',
              backgroundColor: color.LIGHT_PURP
            })
            console.log(confirmation.verificationId)
            if(confirmation.verificationId){
              setShowNext(false)                           //Not Switching Page just Switching UI check Return
            } else{
              Snackbar.show('Error while Sending Code')
            }
          } 
        }
    
    async function verifyCode({navigation}) {
    try {
      await result.confirm(code);
      setConfirmed(true)
      
      console.log('verified code')
        // var credential = firebase.auth.PhoneAuthProvider.credential(result.verificationId, code);
        // firebase.auth().signInWithCredential(credential);  
            // Snackbar.show({
            //   text: 'Verified',
            //     backgroundColor: color.LIGHT_PURP,
            //     textColor: 'white'
            // })
    
    
    } catch (error) {
      console.log(error);
    }
    
    const emailCredential = firebase.auth.EmailAuthProvider.credential(email, password)
    
    auth().currentUser.linkWithCredential(emailCredential)
    .then((userCred) => {
      var user = userCred.user
      console.log(user)
      console.log(user.uid)
      setCurrentUserUid(user.uid)
      ToastAndroid.show('Email Linked With Phone', ToastAndroid.SHORT)
    })
    .catch((error)=> {
      console.log(error)
      Snackbar.show({
      text: `Error while linking ${error}`
      
    })}
    
    )
    const currentUID = auth().currentUser.uid
   



    try {
      firestore().collection('users').doc(currentUID)
      .set({
        email: email,
        phone: phone,
        password: password,
        uid: currentUID,
      })
      .then(Snackbar.show({
        text: 'Your Account Has Been Created Sucessfully',
        textColor: 'white',
        backgroundColor: color.LIGHT_PURP ,
      }))
    } catch (error) {
      console.log(error)
    }
      // userDB.add({
      //        email: email,
      //        phone: phone,
      //        password: password,
      //        uid: currentUID,
      //      })
           
          //  .then(Snackbar.show({
          //    text: 'Your Account Has Been Created Sucessfully',
          //    textColor: 'white',
          //    backgroundColor: color.LIGHT_PURP ,
          //  }))
           
          
          
        //  dispatch(createUser({
        //    uid: currentUID,
        //    phoneNum,
        //    email
        //  }))
          //  navigation.navigate('userDetailsInput')
        
          // var credential = firebase.auth.PhoneAuthProvider.credential(result.verificationId, code);
          // firebase.auth().signInWithCredential(credential);              
    }
     
   
    
 


    








return(
  
     // first container
    
    <View style={styles.container}>
    <StatusBar hidden= {true} backgroundColor={color.PURPLE} barStyle= 'light-content'/>
     <Image style={{width: '100%', height: 190.77, top: -1}}  source={require('../assets/wavebg.png')}/>
     

     {/* input View */}
     {showNext? 
     
     <View style= {styles.formContainer}>
     <View style={styles.titleContainer}>
       <Text style={styles.heading}>Create Your Account</Text>
        <Text style={{color: color.PURPLE, fontSize: 12, marginLeft: 5, fontFamily: 'poppins', bottom: 78}}>
         Enter Your Phone Number to Get OTP
       </Text>
     </View>
    {/* <View style= {styles.formContainer}> */}
      <TextInput
          selectionColor= {color.LIGHT_PURP} 
          autoCorrect= {false} 
          value= {phone} 
          keyboardType= 'phone-pad'
          maxLength={10}
          style={styles.input} 
          placeholder="Mobile Number"
          onChangeText= {(text)=> setPhone(text)}>
      </TextInput>
      
      <TextInput
        autoCompleteType='email'
        selectionColor= {color.LIGHT_PURP} 
        autoCorrect= {false} 
        value= {email} 
        style={styles.input} 
        placeholder="Email"
        onChangeText= {(text)=> setEmail(text)}>
      </TextInput>

      <TextInput
        selectionColor= {color.LIGHT_PURP} 
        autoCorrect= {false} 
        value= {password}
        style={styles.input} 
        placeholder="Password"
        secureTextEntry= {true}
        onChangeText= {(text)=> setPassword(text)}>
      </TextInput>
        

     {/* <View style={styles.phoneInputView}>
      
       <TextInput 
       style={styles.TextInput} 
       placeholder="Mobile Number" 
       value= {phone} 
       onChangeText= {(text) => setPhone(text)}
       keyboardType='phone-pad'>
       </TextInput>
        
     </View>
     
     <View style={styles.phoneInputView}>                
        <TextInput 
          style={styles.TextInput} 
          placeholder="Email" 
          value= {email} 
          onChangeText= {(text) => setEmail(text)}
          keyboardType='default'>
        </TextInput>
      
      </View> 
      
      <View style={styles.phoneInputView}>                
        
        <TextInput 
          style={styles.TextInput}  
          secureTextEntry
          placeholder='Password'
          value= {password} 
          onChangeText= {(text) => setPassword(text)}
          keyboardType='default'>
        </TextInput>
      
      </View> */}
     
     <View
        style={{
          alignItems: 'center',
          marginTop: 50
        }}>
        
        <TouchableOpacity 
              // style={styles.proceedBtn}
          onPress={onNextButtonClicked}
          >
            <LinearGradient
              colors={[color.PURPLE,  '#38B7FF']}
              style={styles.linearGradient}>
              <Text style= {styles.label}>Proceed</Text>
            </LinearGradient>
        </TouchableOpacity>
          
      </View>
      {/* </View> */}
     </View>
        
     :
     <View style={styles.OTPcontainer}> 
        <View 
          style={styles.headingContainer}>
            <Text style={styles.heading}>
              Enter OTP to Verify
            </Text>
          </View>      
        <View style={styles.inputContainer}>
            
            <TextInput
              keyboardType='number-pad' 
              placeholder='######' 
              value={code} 
              onChangeText={(text)=> setCode(text)}>
            </TextInput>
          
        </View>  
        
        <TouchableOpacity 
          onPress={verifyCode}
          style={styles.verifyBtn}>
            <Text style={{color: 'white', fontSize: 18}}>
              Verify
            </Text>
        </TouchableOpacity>
    
    </View>
    
    } 
  </View>

)};
          
          
export default  phoneAuth


const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    // paddingHorizontal: 10, 
    // paddingVertical: 10,
    backgroundColor: 'white',
    // justifyContent: 'space-evenly'
  },

  heading: {
    fontSize: 25,
    color: color.BLACK_SHADE,
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
    marginLeft: 10,
    top: 50
    
  },

  phoneInputView: {
    backgroundColor: color.BACKGROUNDC,
    borderRadius: 10,
    width: '90%',
    height: 55,
    margin: 20,
    top: 60,
    alignItems: 'flex-start',
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
    justifyContent: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
  proceedBtn: {
    width: '95%',
    borderRadius: 25,
    backgroundColor: color.PURPLE,
    height: 50,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  proceed: {
    color: color.BLACK_SHADE,
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: 'bold',
    
    
  },
  forgotPassword: {
    color: 'grey',
    marginLeft: '58%',
    marginTop: 30,
  },
  createNow: {
    color: 'grey',
    fontFamily: 'poppins',
    fontWeight: '600',
    textAlign: 'center',
    bottom: 20,
  },
  moboLogin:{
    width: 200,
    height: 150,
    alignItems: 'center',
    alignSelf: 'center',
    top: 20
},


OTPcontainer: {
  flex: 1,
  backgroundColor: color.BACKGROUNDC

},

heading: {
  fontSize: 25,
  color: color.BLACK_SHADE,
  fontFamily: 'Helvetica',
  fontWeight: '500',
  bottom: 80
},

headingContainer:{
   fontSize: 12,
   fontFamily: 'poppins',
   margin: 20,
   top: 50,
  }, 
inputContainer:{
      width: '90%',
      height: 55,
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
},
input: {
  width: 300,
  height: 55,
  margin: 10,
  paddingLeft: 15,
  backgroundColor: 'white',
  borderWidth: 2,
  borderColor: '#D8D9D5',
  borderRadius: 8
},

formContainer1: {
  alignItems: 'center',
  justifyContent: 'center'
},

label: {
  fontSize: 22,
  fontWeight: '600',
  fontFamily: 'Poppins',
  textTransform: 'capitalize',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
 
},
linearGradient: {
  paddingLeft: 15,
  paddingRight: 15,
  borderRadius: 8,
  marginTop: 16,
  width: 320,
  height: 55,
  justifyContent: 'center',
  alignItems: 'center'
},
buttonText: {
  fontSize: 18,
  fontFamily: 'Gill Sans',
  textAlign: 'center',
  margin: 10,
  color: '#ffffff',
  backgroundColor: 'transparent',
},




})