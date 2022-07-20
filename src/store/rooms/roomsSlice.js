import { createSlice } from '@reduxjs/toolkit';
import fetchRooms from './fetchRooms';

const initState = {
    loading : false,
    errMessage : null,

    rooms : [],
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
            state.rooms = action.payload;
            console.log("Rooms = ",state.rooms);
        },

        setFetchingRoomsFailure(state,action){
            state.loading = false;
            state.errMessage = action.payload;
            state.rooms = [];
        }
    }

});

export {fetchRooms};

export const {setFetchingRooms,setFetchingRoomsFailure,setFetchingRoomsSuccesful} = roomsSlice.actions;

export default roomsSlice.reducer;