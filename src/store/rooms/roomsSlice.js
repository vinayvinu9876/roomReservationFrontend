import { createSlice } from '@reduxjs/toolkit';
import fetchRooms from './fetchRooms';

const initState = {
    loading : false,
    errMessage : null,
    searchText : null,
    rooms : [],


    start           : 0,
    end             : 0,
    currentPageNo   : 0,
    totalPages      : 0,
    totalResults    : 0,
};

const roomsSlice = createSlice({
    name : "rooms",
    initialState : initState,
    reducers : {
        setFetchingRooms(state,action){
            state.loading = true;
            state.errMessage = null;
        },

        setFetchingRoomsSuccesful(state,action){
            state.loading = false;
            state.errMessage = null;
            state.rooms = action.payload["data"];

            state.start = action.payload["start"];
            state.end = action.payload["end"];
            state.currentPageNo = action.payload["pageNo"];
            state.totalPages = action.payload["totalPages"];
            state.totalResults = action.payload["total"];

            console.log("Rooms = ",state.rooms);
        },

        setFetchingRoomsFailure(state,action){
            state.loading = false;
            state.errMessage = action.payload;
            state.rooms = [];
        },

        setSearchText(state,action){
            state.searchText = action.payload;
        }
    }

});

export {fetchRooms};

export const {setFetchingRooms,setFetchingRoomsFailure,setFetchingRoomsSuccesful, setSearchText} = roomsSlice.actions;

export default roomsSlice.reducer;