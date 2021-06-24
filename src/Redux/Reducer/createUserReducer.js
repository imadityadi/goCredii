import {createSlice} from '@reduxjs/toolkit'


const userAuthReducer = createSlice({
    name: 'AuthDetails',
    initialState: {
        uid: null,
        email: '',
        phoneNum: '',
        isAuthenticated: false
    },
    reducers: {
        createUser(state, action){
            state.uid = action.payload.uid,
            state.phoneNum = action.payload.phoneNum,
            state.email = action.payload.email
        },

        loggedin(state, action){
            state.isAuthenticated = action.payload.isAuthenticated
        },
        loggedout(state, action){
            state.isAuthenticated = action.payload.isAuthenticated
        }

      
    }
    
})

export const {createUser} = userAuthReducer.actions
export default userAuthReducer.reducer

