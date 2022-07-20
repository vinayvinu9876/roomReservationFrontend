import { createSlice } from "@reduxjs/toolkit";
import fetchRoomsSchedule from "./fetchRoomsSchedule";

const initialState = {
    loading : false,
    errMessage : null,
    roomScheduleData : []
};

const roomScheduleSlice = createSlice({
    name : "roomSchedule",
    initialState : initialState,

    reducers : {
        setFetchingRoomScheduleData(state,action){
            state.loading = true;
            state.roomScheduleData = [];
            state.errMessage = null;
        },

        setFetchingRoomScheduleDataSuccess(state,action){
            state.loading = false;
            state.roomScheduleData = action.payload;
            state.errMessage = null;
        },

        setFetchingRoomScheduleDataFailure(state,action){
            state.loading = false;
            state.errMessage = action.payload;
            state.roomScheduleData = [];
        }
    }

});

export {fetchRoomsSchedule};

export const {setFetchingRoomScheduleData,setFetchingRoomScheduleDataFailure,setFetchingRoomScheduleDataSuccess} = roomScheduleSlice.actions;

export default roomScheduleSlice.reducer;