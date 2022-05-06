import { createSlice } from '@reduxjs/toolkit';
import fetchFeatures from './fetchFeatures';

const initState = {
    loading : false,
    errMessage : null,
    featuresData : []    
};

const featuresSlice = createSlice({
    name : "features",
    initialState : initState,
    reducers : {
        setFetchingFeatures(state,action){
            state.loading = true;
            state.errMessage = null;
            state.featuresData = [];
        },

        setFetchingFeaturesSuccess(state,action){
            state.loading = false;
            state.errMessage = null;
            state.featuresData = action.payload;
        },

        setFetchingFeaturesFailed(state,action){
            state.loading = false;
            state.errMessage = action.payload;
        }
    }
});

export {fetchFeatures};

export const {setFetchingFeatures,setFetchingFeaturesFailed,setFetchingFeaturesSuccess} = featuresSlice.actions;

export default featuresSlice.reducer;

