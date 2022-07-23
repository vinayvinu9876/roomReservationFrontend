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
    role_ids : null,
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
                case "role_ids" :   state.role_ids = validateRoleIds(action.payload.value);break;
                default         :   console.log("Invalid field name");break;
            }
        }
    }
});

const validateRoleIds = (role_ids) => {
    if(role_ids){
        if(isNaN(role_ids[role_ids.length-1]) && (role_ids[role_ids.length-1]!==',') ){
            return role_ids.substring(0,role_ids.length-1);
        }
    }

    return role_ids;
}

export {addPriority};

export const {addingPriority,addPrioritySuccess,addPriorityFailed,setFieldValue} = addPrioritySlice.actions;

export default addPrioritySlice.reducer;