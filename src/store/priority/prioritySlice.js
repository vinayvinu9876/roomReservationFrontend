import { createSlice } from '@reduxjs/toolkit';
import fetchPriority from './fetchPriority';

const initialState = {
    loading : false,
    errMessage : null,
    priorityData : []
};

const prioritySlice = createSlice({

    name : "priority",
    initialState : initialState,
    reducers : {

        fetchingPriority(state,action){
            state.loading = true;
            state.errMessage = null;
            state.priorityData = [];
        },

        fetchingPrioritySuccess(state,action){
            state.loading = false;
            state.errMessage = null;
            state.priorityData = action.payload;
        },

        fetchingPriorityFailed(state,action){
            state.loading = false;
            state.errMessage = action.payload;
            state.priorityData = [];
        }
    }

});

export {fetchPriority};

export const {fetchingPriority,fetchingPrioritySuccess,fetchingPriorityFailed} = prioritySlice.actions;

export default prioritySlice.reducer;