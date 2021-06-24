import React,{ useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Alert,
    Image,
    Button
  } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage, { firebase } from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import {CheckCircle} from 'react-native-feather';
import LinearGradient from 'react-native-linear-gradient';
import * as color from '../strings'
import { basicDetailsFilled } from '../Redux/Reducer/basicDetailsReducer';
import auth from '@react-native-firebase/auth'


export default function UploadDocuments() {

    const [image, setImage] = useState(null);
    const [aadharFrnt, setAadharFrnt] = useState(null);
    const [aadharbck, setAadharBck] = useState(null);
    const [pancard, setPanCard] = useState(null);
    const [selfie, setSelfie] = useState(null);
    const [orgId, setOrgId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const imageData = [aadharFrnt, aadharbck, pancard, selfie]
    let allImageURL =  [] 
    // useEffect((image) => {allImageURL.push(image)}, [image ]) 


    // state management imports
    const dispatch =  useDispatch()
   const {email} = useSelector((state) => {return state 
  })


    const selectAadharFrnt = (props) => {
        const options = {
          maxWidth: 1000,
          maxHeight: 1000,
          cameraType: 'back',
          quality: 0.3
        };
        launchCamera( options, response => {
           if (response.didCancel) {
             console.log('User cancelled image picker');
           } else if (response.error) {
             console.log('ImagePicker Error: ', response.error);
           } else if (response.customButton) {
             console.log('User tapped custom button: ', response.customButton);
           } else {
             const source = { uri: response.uri };
             console.log(` Aadhar front : ${source}`);
             props(source);
            
           }
           
         });
       };
        

        

//  select Aadhar back side

      // const selectAadharBck = (props) => {
      //   const options = {
      //     maxWidth: 1000,
      //     maxHeight: 1000,
      //     cameraType: 'back',
      //     quality: 0.3
      //   };
        
        
      //   launchCamera(options, response => {
      //     if (response.didCancel) {
      //       console.log('User cancelled image picker');
      //     } else if (response.error) {
      //       console.log('ImagePicker Error: ', response.error);
      //     } else if (response.customButton) {
      //       console.log('User tapped custom button: ', response.customButton);
      //     } else {
      //       const source = { uri: response.uri };
      //       console.log(source);
      //       props(source);
      //     }
      //   })

      // }
  
      const uploadImage =  (props) => {


        
        const promises = [];
        const { uri } = props ;
        const filename = uri.substring(uri.lastIndexOf('/') + 1, );
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        setUploading(true);
        setTransferred(0);
        const task =  storage()
          .ref(filename)
          .putFile(uploadUri);
          allImageURL.push(uploadUri)  

          setImage(uploadUri)
        const currentUID = auth().currentUser.uid  
        let i
        for(i=0; i<5; i++){
           
        }
        let aadharFrnturl = allImageURL[0]
        let aadharbckurl = allImageURL[1]
        let panCardurl = allImageURL[2]
        let selfieurl = allImageURL[3]

        const userDB = firestore().collection('users')
        console.log(allImageURL)
        allImageURL.forEach((url) => {
        userDB
        .doc(currentUID)
        .update({
         aadharFrnturl,
         aadharbckurl,
         panCardurl,
         selfieurl,
         isBasicDetailsFilled: true
        
        })
        .catch((err) => console.log(err))
        console.log(i)
        console.log(allImageURL)
      })
      
        // set progress state
        promises.push(task)
        task.on('state_changed', snapshot => {
          
          setTransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
          );
          
        });
        
      
    
      
      Promise.all(promises)
      .then(() => alert('all files uploaded'))
      .catch((err) => console.log(err))
        
      }
    

     
    const signout = () => {
      auth().signOut()
    }

   const uploadAllImage = ({navigation}) => {
    imageData.forEach(props => {
      uploadImage(props)
    })
    dispatch(basicDetailsFilled({
      isBasicDetailsFilled : true,
      
    }))
    // navigation.navigate('Dashboard')
  } 
  
      
    

  return (
    <SafeAreaView style={styles.container}>
       <View style= {styles.buttonContainer}>
          <TouchableOpacity 
            onPress={() => selectAadharFrnt(setAadharFrnt)}
            style={styles.tapBoxContainer}>
            {aadharFrnt !== null?
            <Image source={{ uri: aadharFrnt.uri }} style= {styles.tapBox}/>: 
            null
            }
            
            <Text>Aadhar Front  </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectAadharFrnt(setAadharBck)} 
            style={styles.tapBoxContainer}>
            {aadharbck !== null?
            <Image source={{ uri: aadharbck.uri }}  style= {styles.tapBox}/>: 
            null
            }
            <Text>Aadhar Back  </Text>
          </TouchableOpacity>
        </View>

        <View style= {styles.buttonContainer}>
          <TouchableOpacity 
            onPress={() => selectAadharFrnt(setPanCard)}
            style={styles.tapBoxContainer}>
            {pancard !== null?
            <Image source={{ uri: pancard.uri }} style= {styles.tapBox}/>: 
            null
            }
            
            <Text>pan Card  </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectAadharFrnt(setSelfie)} 
            style={styles.tapBoxContainer}>
            {selfie !== null?
            <Image source={{ uri: selfie.uri }}  style= {styles.tapBox}/>: 
            null
            }
            <Text>Selfie  </Text>
          </TouchableOpacity>
        </View>

        {uploading ? (
        <View style={styles.progressBarContainer}>
          <Progress.Bar progress={transferred} width={300} />
        </View>
      ) : (
        <TouchableOpacity
          onPress ={uploadAllImage}
          >
          <LinearGradient

            colors={[color.PURPLE,  '#38B7FF']}
            style={styles.linearGradient}>
            <CheckCircle stroke="white" width={25} height={25} />
          </LinearGradient>
          
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={signout}>
        <Text>
        Signout

        </Text>
      </TouchableOpacity>
        
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 30,
    paddingHorizontal: 10
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center'
  },
  progressBarContainer: {
    marginTop: 20
  },
  imageBox: {
    width: 300,
    height: 300
  },

  tapBox: {
    height: 100,
    width: 150,
    borderRadius: 10,
    
  },
  tapBoxContainer: {
    backgroundColor: 'grey',
    height: 100,
    width: 150,
    borderRadius: 10,
    elevation: 5
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    
  },
  proceedBtn: {
    
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
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
    marginTop: 16,
    width: '15%',    
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
    marginLeft: '82%'
  },
});