import { createSlice } from '@reduxjs/toolkit';
import fetchFeatures from './fetchFeatures';
import editFeature from './editFeature/editFeature';

const initState = {
    loading : false,
    errMessage : null,
    featuresData : [] ,

    search : null,
    status : null,

    start : 0,
    end : 0,
    totalResults : 0,
    pageNo : 0,
    totalPages :0,
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
            state.featuresData = action.payload["data"];

            state.start = action.payload["start"];
            state.end = action.payload["end"];
            state.totalResults = action.payload["totalResults"];
            state.pageNo = action.payload["currentPageNo"];
            state.totalPages = action.payload["totalPages"];
        },

        setFetchingFeaturesFailed(state,action){
            state.loading = false;
            state.errMessage = action.payload;
        },

        setEditingFeature(state,action){
            state.loading = true;
            state.errMessage = null;
        },

        setEditingFeatureFailed(state,action){
            state.loading = false;
            state.errMessage = action.payload;
        },

        setEditingFeatureSuccess(state,action){
            state.loading = false;
            state.errMessage = null;
        },

        setSearch(state,action){
            state.search = action.payload;
        },

        setStatus(state,action){
            state.status = action.payload;
        }
    }
});

export {fetchFeatures , editFeature};

export const {setSearch,setStatus} = featuresSlice.actions;
export const {setEditingFeature,setEditingFeatureFailed,setEditingFeatureSuccess} = featuresSlice.actions;
export const {setFetchingFeatures,setFetchingFeaturesFailed,setFetchingFeaturesSuccess} = featuresSlice.actions;

export default featuresSlice.reducer;

