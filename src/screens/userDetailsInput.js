import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 
{
    Text, 
    View, 
    StyleSheet, 
    StatusBar, 
    TextInput,
    TouchableOpacity 
} from 'react-native'
import * as color from '../strings'
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'
import SwitchSelector from 'react-native-switch-selector';
import { ScrollView } from 'react-native-gesture-handler';
import { ArrowLeft } from 'react-native-feather';
import { Radio} from 'native-base';
import * as heading from '../strings'
import Snackbar from 'react-native-snackbar'
import auth from '@react-native-firebase/auth'

import {basicDetailsFilled} from '../Redux/Reducer/basicDetailsReducer'


const userDetailsInput = ({navigation}) => {
    const {isBasicDetailsFilled, email, uid} =   useSelector((state) => {
        return state
    })
    console.log(auth().currentUser.uid)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [DOB, setDOB] = useState('');
    const [gender, setGender] = useState('');
    const [alternateMob, setAlternateMob] = useState('');
    const [pincode, setPincode] = useState('');
    const [secondPage, setSecondpage] = useState(false);
    const [orgName, setOrgName] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [salary, setSalary] = useState('');
    const [nominee, setNominee] = useState('');
    const [salaryMode, setSalaryMode] = useState('');
    const [takenLoanYes, setTakenLoanYes] = useState(false);
    const [takenLoanNo, setTakenLoanNo] = useState(false);
    const [panNum, setPanNum] = useState('');

    const genderOptions = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        
      ];
    const employmentOption = [
        { label: "Salaried", value: "Salaried" },
        { label: "Student", value: "Student" },
        { label: "Self-Employed", value: "Self-Employed" },
        
      ];
    const salaryModeOption = [
        { label: "Cash", value: "ByCash" },
        { label: "Bank", value: "inBank" },
        { label: "Cheque", value: "Cheque" },
        
      ];
      console.log(employmentType)
      console.log(gender)
    
    // const dispatch = useDispatch()
    // const signout = () => {
        
    //     auth().signOut()
    //     dispatch(basicDetailsFilled({
    //         isBasicDetailsFilled : true,
            
    //     }))
    // }
    
    const handleContinue = () => {
        if(!firstName || !lastName || !gender || !DOB || !alternateMob || !pincode){
            Snackbar.show({
                text: 'Please fill all details',
                backgroundColor: color.LIGHT_PURP,
                textColor: 'white'
            })
        } else {
            setSecondpage(true)
        }
           

    }

     const setbasicDetails = () => {

        if(!orgName || !employmentType || !salaryMode || !salary){
            Snackbar.show({
                text: 'Please fill all details',
                backgroundColor: color.LIGHT_PURP,
                textColor: 'white'
            })
        }else{
           const currentUID = auth().currentUser.uid
            firestore().collection('users').doc(currentUID)// try changing type of 
            .update({
                FirstName: firstName,
                LastName: lastName,
                DateOfBirth: DOB,
                AlternateNumber: alternateMob,
                Gender: gender,
                Pincode: pincode,
                Salary: salary,
                Organisation: orgName,
                SalaryMode: salaryMode,
            })
            .catch((err)=> console.error(err))
            .then(navigation.navigate('UploadDocuments'))
                
            }
        } 
            
 
            

     const handleTakenLoanYes = () => {
       setTakenLoanYes(true)
       setTakenLoanNo(false)
     }
     const handleTakenLoanNo = () => {
       setTakenLoanNo(true)
       setTakenLoanYes(false)
     }

     


     


    return (
        
       <View  style={styles.container}>
            <StatusBar backgroundColor='white' barStyle= 'dark-content'/>
            
               
                    
                    
                    {!secondPage? 
                        <View style={styles.formContainer1}>
                            <Text style= {styles.headingFirstForm}>Basic Details</Text>
                                <TextInput
                                    selectionColor= {color.LIGHT_PURP} 
                                    autoCorrect= {false}
                                    value= {firstName} 
                                    style={styles.input} 
                                    placeholder="First Name"
                                    onChangeText= {(text)=> setFirstName(text)}>
                                </TextInput>
                                <TextInput
                                    selectionColor= {color.LIGHT_PURP} 
                                    autoCorrect= {false} 
                                    value= {lastName} 
                                    style={styles.input} 
                                    placeholder="Last Name"
                                    onChangeText= {(text)=> setLastName(text)}>
                                </TextInput>
                                <TextInput
                                    selectionColor= {color.LIGHT_PURP} 
                                    autoCorrect= {false} 
                                    value= {DOB} 
                                    style={styles.input} 
                                    placeholder="DD-MM-YY"
                                    onChangeText= {(text)=> setDOB(text)}
                                    maxLength= {10}
                                    keyboardType= 'numeric'>
                                    
                                </TextInput>
                                <TextInput
                                    selectionColor= {color.LIGHT_PURP} 
                                    autoCorrect= {false} 
                                    value= {alternateMob} 
                                    keyboardType= 'phone-pad'
                                    maxLength={10}
                                    style={styles.input} 
                                    placeholder="Alternate Mobile"
                                    onChangeText= {(text)=> setAlternateMob(text)}>
                                </TextInput>
                            
                                <SwitchSelector
                                    borderColor= '#D8D9D5'
                                    style= {styles.genSelector}
                                    buttonColor= {color.PURPLE}
                                    borderRadius= {8}
                                    buttonMargin = {5}
                                    options={genderOptions}
                                    onPress={value => setGender(value)}/>
                                    
            
                                <TextInput
                                    selectionColor= {color.LIGHT_PURP}  
                                    autoCorrect= {false}
                                    value= {pincode} 
                                    keyboardType= 'phone-pad'
                                    style={styles.input} 
                                    placeholder="PinCode"
                                    autoCompleteType= 'postal-code'
                                    onChangeText= {(text)=> setPincode(text)}>
                                </TextInput>
                                <View style={{justifyContent: 'center', }}>
                                    <TouchableOpacity 
                                        onPress= {() => handleContinue()}
                                        style={styles.button}>                   
                                            <Text style= {styles.label}>Continue</Text>               
                                    </TouchableOpacity>
                                </View>
                        </View>
                        :
                        <View style={styles.formContainer1}>
                            <TouchableOpacity 
                                onPress = {() => setSecondpage(false)}
                                style = {styles.backIcon}>
                                <ArrowLeft stroke={color.PURPLE} width={23} height={23} />
                            </TouchableOpacity>
                                <Text style= {styles.heading}>Basic Details</Text>
                        <ScrollView style={styles.scrollForm}>
                            <TextInput
                                selectionColor= {color.LIGHT_PURP}  
                                autoCorrect= {false}
                                value= {orgName} 
                                style={styles.input} 
                                placeholder="Company/School Name"
                                onChangeText= {(text)=> setOrgName(text)}>
                            </TextInput>
                            <SwitchSelector
                                fontSize= {12}
                                borderColor= '#D8D9D5'
                                style= {styles.genSelector}
                                buttonColor= {color.PURPLE}
                                borderRadius= {8}
                                buttonMargin = {2}
                                options={employmentOption}
                                onPress={value => setEmploymentType(value)}/>
                            <TextInput
                                selectionColor= {color.LIGHT_PURP} 
                                autoCorrect= {false}
                                value= {nominee}  
                                style={styles.input} 
                                placeholder="Nominee Name"
                                onChangeText= {(text)=> setNominee(text)}>
                            </TextInput>
                            
                            <TextInput
                                selectionColor= {color.LIGHT_PURP}  
                                autoCorrect= {false}
                                value= {salary}  
                                style={styles.input} 
                                placeholder="Monthly Salary"
                                onChangeText= {(text)=> setSalary(text)}>
                            </TextInput>
                            <SwitchSelector
                                    fontSize= {12}
                                    borderColor= '#D8D9D5'
                                    style= {styles.genSelector}
                                    buttonColor= {color.PURPLE}
                                    borderRadius= {8}
                                    buttonMargin = {2}
                                    options={salaryModeOption}
                                    onPress={value => setSalaryMode(value)}/>
                            <Text style={styles.takenLoanHeading}>{heading.ASKTAKENLOAN}</Text>
                            <View style={styles.radioContainer}>
                                <Radio
                                    style={{marginHorizontal: 15, marginVertical: 8}}
                                    onPress={() => handleTakenLoanYes()}
                                    color= {color.PURPLE}
                                    selected={takenLoanYes}
                                    selectedColor={color.PURPLE}>
                                </Radio>
                                <Text style={{marginHorizontal: 15, marginVertical: 8}}>Yes</Text>
                                <Radio
                                    style={{marginHorizontal: 15, marginVertical: 8}}
                                    onPress={() => handleTakenLoanNo()}
                                    color= {color.PURPLE}
                                    selected={takenLoanNo}
                                    selectedColor={color.PURPLE}>
                                </Radio>
                                <Text style={{marginHorizontal: 15, marginVertical: 8}}>No</Text>    
                            </View>
                            <TextInput
                                selectionColor= {color.LIGHT_PURP} 
                                autoCorrect= {false}
                                value= {panNum}  
                                style={styles.input} 
                                placeholder="PAN Number"
                                maxLength={10}
                                autoCapitalize= 'characters'
                                onChangeText= {(text)=> setPanNum(text)}>
                            </TextInput>
                    </ScrollView>
                           <View style={{justifyContent: 'center'}}>
                                <TouchableOpacity 
                                    onPress= {() => setbasicDetails()}
                                    // onPress= {() => testfun()}
                                    style={styles.button}>                   
                                        <Text style= {styles.label}>Continue</Text>               
                                </TouchableOpacity>
                            </View>
                    </View>
                        
                      
                } 
                    
                
                        
                </View>
            
    )
}

export default userDetailsInput
                        

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 15, 
        paddingVertical: 30,
        backgroundColor: 'white',
        justifyContent: 'space-evenly'
        
    },
    
    input: {
        width: 300,
        height: 48,
        margin: 10,
        paddingLeft: 15,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#D8D9D5',
        borderRadius: 8
    },
    genSelector: {
        margin: 10,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#D8D9D5'
    },


    heading: {
        fontSize: 20,
        fontFamily: 'Poppins',
        color: color.PURPLE,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 5
    },
    headingFirstForm: {
        fontSize: 20,
        fontFamily: 'Poppins',
        color: color.PURPLE,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: -20,
        marginBottom: 25,

    },
    backIcon: {
        marginLeft: 5,
        marginTop: -15
        
    },
    button: {
        backgroundColor: color.PURPLE,
        borderRadius: 10,
        width: '95%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        top: 20,
        elevation: 2,
        
    },
    label: {
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'Poppins',
        textTransform: 'capitalize',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        letterSpacing: 0
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 5
        
    },
    takenLoanHeading: {
        fontFamily: 'Poppins',
        marginLeft: 10,
        fontSize: 15,
        paddingVertical: 8
    },
    scrollForm: {
        flex: 8, 
        backgroundColor: 'white',
        width: 320,
    },
    formContainer1: {
        justifyContent: 'flex-start'
    },
    
})