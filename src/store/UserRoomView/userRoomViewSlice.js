import { createSlice } from "@reduxjs/toolkit";
import fetchRoomData from "./fetchRoomData";

const initialState = {
    loading : false,
    errMessage : null,
    roomData : []
};

const userRoomViewSlice = createSlice({
    name : "userRoomView",
    initialState : initialState,

    reducers : {
        setFetchingUserRoomViewData(state,action){
            state.loading = true;
            state.errMessage = null;
            state.roomData =  null;
        },

        setFetchingUserRoomViewDataSuccess(state,action){
            state.loading = false;
            state.errMessage = null;
            state.roomData = action.payload;
        },

        setFetchingUserRoomViewDataFailure(state,action){
            state.loading = false;
            state.errMessage = action.payload;
            state.roomData = null;
        }
    }
});

export {fetchRoomData};
export const {setFetchingUserRoomViewData, setFetchingUserRoomViewDataFailure, setFetchingUserRoomViewDataSuccess} = userRoomViewSlice.actions;
export default userRoomViewSlice.reducer;