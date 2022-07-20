import {createSlice} from '@reduxjs/toolkit';
import addReservation from './addReservation';
import toast from 'react-hot-toast';

const initialState = {
    loading : false,
    errMessage: null,
};

const addRoomReservationSlice = createSlice({
    name : "addRoomReservation",
    initialState : initialState,
    reducers : {
        setAddingRoomReservation(state,action){
            state.loading = true;
            state.errMessage = null;
        },

        setAddRoomReservationSuccess(state,action){
            state.loading = false;
            state.errMessage = null;
            toast.success("Room Reservation Added Succesfully");
        },

        setAddRoomReservationFailure(state,action){
            state.loading = false;
            state.errMessage = action.payload;
            toast.error(action.payload);
        }
    }
});

export {addReservation};

export const {setAddingRoomReservation,setAddRoomReservationSuccess, setAddRoomReservationFailure} = addRoomReservationSlice.actions;

export default addRoomReservationSlice.reducer;