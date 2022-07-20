import { createSlice } from "@reduxjs/toolkit";
import fetchUserRooms from "./fetchUserRooms";

const initState = {
    loading : false,
    errMessage : null,
    rooms : []
};

const userRoomSlice = createSlice({
    name : "userRooms",
    initialState : initState,
    
    reducers : {
        setFetchingUserRooms(state,action){
            state.loading = true;
            state.errMessage = null;
            state.rooms = [];
        },

        setFetchingUserRoomsSuccesful(state,action){
            state.loading = false;
            state.errMessage = null;
            state.rooms = action.payload;
        },

        setFetchingUserRoomsFailure(state,action){
            state.loading = false;
            state.errMessage = action.payload;
            state.rooms = [];
        }
    }
})

export {fetchUserRooms};

export const {setFetchingUserRooms,setFetchingUserRoomsSuccesful,setFetchingUserRoomsFailure} = userRoomSlice.actions;

export default userRoomSlice.reducer;