import {createSlice} from '@reduxjs/toolkit'


const basicDetailsReducer = createSlice({
    name: 'BasicDetails',
    initialState: {
        isBasicDetailsFilled: null,
        firstName: null,
        lastName: null,
        panNumber: null
    },
    reducers: {
        basicDetailsFilled(state, action){
            // state.isBasicDetailsFilled = action.payload.isBasicDetailsFilled
            // // state.firstName = action.payload.firstName,
            // // state.panNumber = action.payload.panNumber
           state.isBasicDetailsFilled = action.payload
           state.firstName = action.payload.firstName,
           state.lastName = action.payload.lastName,
           state.panNumber = action.payload.panNumber
        },
        resetState(state, action){
          state = initialState
        }
 
    }
    
})

export const {basicDetailsFilled, resetState} = basicDetailsReducer.actions
export default basicDetailsReducer.reducer

