import { createSlice } from '@reduxjs/toolkit';
import addFeature from './addFeature';

const initState = {
    loading : false,
    errMessage: null,
    successMessage:  null,

    feature_name : null,
    feature_desc : null,
    total_available : null,
    status : null
};

const addFeaturesSlice = createSlice({

    name : "addFeature",
    initialState : initState,
    reducers : {
        setAddingFeature(state,action){
            state.loading = true;
            state.errMessage = null;
            state.successMessage = null;
        },

        setAddingFeatureSuccess(state,action){
            state.loading = false;
            state.errMessage = null;
            state.successMessage = "Feature added successfully";
        },

        setAddingFeatureFailed(state,action){
            state.loading = false;
            state.errMessage = action.payload;
            state.successMessage = null;
        },

        setFieldValue(state,action){
                
            console.log("Field name = ",action.payload.fieldName," Value = ",action.payload.value);

            switch(action.payload.fieldName){
                case "feature_name" : state.feature_name = action.payload.value;break;
                case "feature_desc" : state.feature_desc = action.payload.value;break;
                case "total_available" : state.total_available = action.payload.value;break;
                case "status" : state.status = action.payload.value;break;
                default : console.log("Invalid field name");
            }
        }
    }

});

export {addFeature};

export const {setAddingFeature,setAddingFeatureFailed,setAddingFeatureSuccess,setFieldValue } = addFeaturesSlice.actions;

export default addFeaturesSlice.reducer;