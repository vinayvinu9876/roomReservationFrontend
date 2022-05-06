import { createSlice } from '@reduxjs/toolkit';
import addPriority from './addPriority';

const initState = {
    loading : false,
    errMessage : null,
    successMessage : null,

    name : null,
    desc : null,
    priority_no : null,
    status : null,
};

const addPrioritySlice = createSlice({
    name : "addPriority",
    initialState :initState,
    reducers : {
        addingPriority(state,action){
            state.loading = true;
            state.errMessage = null;
            state.successMessage = null;
        },

        addPrioritySuccess(state,action){
            state.loading = false;
            state.errMessage = null;
            state.successMessage = "Priority Added Succesfully";
        },

        addPriorityFailed(state,action){
            state.loading = false;
            state.errMessage = action.payload;
            state.successMessage = null;
        },

        setFieldValue(state,action){
            switch(action.payload.fieldName){
                case "name" : state.name = action.payload.value;break;
                case "desc" : state.desc = action.payload.value;break;
                case "priority_no" : state.priority_no = action.payload.value;break;
                case "status"   :   state.status = action.payload.value;break;
                default         :   console.log("Invalid field name");break;
            }
        }
    }
});

export {addPriority};

export const {addingPriority,addPrioritySuccess,addPriorityFailed,setFieldValue} = addPrioritySlice.actions;

export default addPrioritySlice.reducer;