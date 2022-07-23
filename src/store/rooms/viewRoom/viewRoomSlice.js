import { createSlice } from '@reduxjs/toolkit';
import viewRoom from './actions/viewRoom';
import removeRoomImage from './actions/removeRoomImage';
import updateRoomFeature from './actions/updateRoomFeature';
import addImage from './actions/addImage';

const initState = {
    loading : false,
    errMessage : null,
    room_data : null,
    room_features : [],
    room_down_time : [],
    room_media : []
};

const viewRoomSlice = createSlice({
    name : "viewRoom",
    initialState : initState,
    reducers : {

        setFetchingRoomData(state,action){
            state.loading = true;
            state.room_data = null;
            state.room_features = [];
            state.room_down_time = [];
            state.room_media = [];
        },

        setFetchingRoomDataSuccess(state,action){
            state.loading = false;
            state.errMessage = null;
            state.room_data = action.payload.room_data;
            state.room_features = action.payload.room_features;
            state.room_media = action.payload.room_media;
            state.room_down_time = action.payload.room_down_time;
        },

        setFetchingRoomDataFailure(state,action){
            state.loading = false;
            state.errMessage = action.payload;
            state.room_data = null;
        },
        
        removingRoomImage(state,action){
            state.loading = true;
            state.errMessage = null;
        },

        removingImageSuccess(state,action){
            state.loading = false;
        },

        removingImageFailed(state,action){
            state.loading = false;
            state.errMessage = action.payload;
        },

        addingRoomImage(state,action){
            state.loading = true;
            state.errMessage = null;
        },

        addingRoomImageSuccess(state,action){
            state.loading = false;
            state.errMessage = null;
        },

        addingRoomImageFailed(state,action){
            state.loading = false;
            state.errMessage = action.payload;
        },

        updatingRoomData(state,action){
            state.loading = true;
            state.errMessage = null;
        },

        updateRoomDataSuccess(state,action){
            state.loading = false;
            state.errMessage = null;
        },

        updateRoomDataFailed(state,action){
            state.loading = false;
            state.errMessage = action.payload;
        },

        removingRoomFeature(state,action){
            state.loading = true;
            state.errMessage = null;
        },

        removingRoomFeatureSuccess(state,action){
            state.loading = false;
            state.errMessage  = null;
        },

        removingRoomFeatureFailed(state,action){
            state.loading = false;
            state.errMessage = action.payload;
        },

        addingFeature(state,action){
            state.loading = true;
            state.errMessage = null;
        },

        addingFeatureSuccess(state,action){
            state.loading = false;
            state.errMessage = null;
        },

        addingFeatureFailure(state,action){
            state.loading = false;
            state.errMessage = action.payload;
        },

        removingRoomDownTime(state,action){
            state.loading = true;
            state.errMessage = null;
        },

        removingDownTimeSuccess(state,action){
            state.loading = false;
            state.errMessage = null;
        },

        removingDownTimeFailure(state,action){
            state.loading = false;
            state.errMessage = action.payload;
        },

        addingRoomDownTime(state,action){
            state.loading = true;
            state.errMessage = null;
        },

        addingRoomDownTimeSuccess(state,action){
            state.loading = false;
            state.errMessage = null;
        },

        addingRoomDownTimeFailure(state,action){
            state.loading = false;
            state.errMessage = action.payload;
        },

        updatingRoomFeature(state,action){
            state.loading = true;
            state.errMessage = null;
        },

        updatingRoomFeatureFailed(state,action){
            state.loading = false;
            state.errMessage = action.payload;
        },

        updatingRoomFeatureSuccess(state,action){
            state.loading = false;
            state.errMessage = null;
        }
    }

});

export {
            viewRoom,
            removeRoomImage,
            addImage,
            updateRoomFeature
       };

export const {
    setFetchingRoomData,
    setFetchingRoomDataFailure,
    setFetchingRoomDataSuccess,
    
    removingRoomImage,
    removingImageSuccess,
    removingImageFailed,

    addingRoomImage,
    addingRoomImageSuccess,
    addingRoomImageFailed,

    updatingRoomData,
    updateRoomDataSuccess,
    updateRoomDataFailed,

    removingRoomFeature,
    removingRoomFeatureFailed,
    removingRoomFeatureSuccess,

    addingFeature,
    addingFeatureFailure,
    addingFeatureSuccess,

    removingDownTimeFailure,
    removingDownTimeSuccess,
    removingRoomDownTime,


    addingRoomDownTime,
    addingRoomDownTimeFailure,
    addingRoomDownTimeSuccess,

    updatingRoomFeature,
    updatingRoomFeatureFailed,
    updatingRoomFeatureSuccess

} = viewRoomSlice.actions;

export default viewRoomSlice.reducer;