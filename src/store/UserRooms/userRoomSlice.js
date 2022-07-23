import { createSlice } from "@reduxjs/toolkit";
import fetchUserRooms from "./fetchUserRooms";

const initState = {
    loading : false,
    errMessage : null,
    rooms : [],

    start : 0,
    end : 0 ,
    currentPageNo : 0,
    totalResults : 0,
    totalPages : 0,
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
            console.log("USer rooms data = ",action.payload);
            state.rooms = action.payload["data"];

            state.start = action.payload["start"];
            state.end = action.payload["end"];
            state.totalPages = action.payload["total_pages"];
            state.currentPageNo = action.payload["pageNo"];
            state.totalResults = action.payload["count"];
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