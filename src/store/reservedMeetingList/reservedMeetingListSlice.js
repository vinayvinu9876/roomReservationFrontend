import { createSlice } from "@reduxjs/toolkit";
import getReservedMeetingList from "./getReservedMeetingList";

const initialState = {
    loading : false,
    errMessage : null,
    meetingList : [],
    totalResult : 0,
    totalPages : 0,
    startIndex : 0,
    endIndex : 0 ,
    pageNo : 0,

    searchText : null,
    sort : 2,
    start : null,
    end : null,
    room_id : null,

};

const ReservedMeetingList = createSlice({
    name : "reservedMeetingList",
    initialState : initialState,
    reducers : {
        setFetchingMeetingList(state,action){
            state.loading = true;
            state.errMessage = null;
            state.meetingList = [];
        },

        setFetchingMeetingListSuccessful(state,action){
            state.loading = false;
            state.errMessage = null;
            if(action.payload){
                state.meetingList = action.payload["data"];
                state.totalResult = action.payload["count"];
                state.startIndex = action.payload["startIndex"];
                state.endIndex = action.payload["endIndex"];
                state.pageNo = action.payload["pageNo"];
                state.totalPages = action.payload["totalPages"];

                state.searchText = action.payload["searchText"];
                state.start = action.payload["start"];
                state.end = action.payload["end"];
                state.sort = action.payload["sort"];
                state.room_id = action.payload["room_id"];
            }
        },

        setFetchingMeetingListFailure(state,action){
            state.loading = false;
            state.errMessage = action.payload;
            state.meetingList = [];
        },

        setSearchText(state,action){
            state.searchText = action.payload;
        },

        setStartDate(state,action){
            state.start = action.payload;
        },

        setEndDate(state,action){
            state.end = action.payload;
        },

        setRoomId(state,action){
            state.room_id = action.payload;
        },

        setSortId(state,action){
            state.sort = action.payload;
        }
    }
});

export {getReservedMeetingList};

export const { setSearchText, setStartDate, setEndDate, setRoomId, setSortId } = ReservedMeetingList.actions;
export const {setFetchingMeetingList,setFetchingMeetingListFailure,setFetchingMeetingListSuccessful} = ReservedMeetingList.actions;

export default ReservedMeetingList.reducer;