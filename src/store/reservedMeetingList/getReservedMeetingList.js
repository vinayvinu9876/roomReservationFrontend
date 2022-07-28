import axios from "axios";
import buildUrl from '../../utils/buildUrl';
import checkIfAuthFailed from "../../utils/onAuthFailed";
import { setFetchingMeetingList, setFetchingMeetingListFailure, setFetchingMeetingListSuccessful } from "./reservedMeetingListSlice";

const getReservedMeetingList = (pageNo) => {
    return (dispatch,getState)=>{

        const searchText = getState().reservedMeetingList.searchText;
        const start = getState().reservedMeetingList.start;
        const end = getState().reservedMeetingList.end;
        const room_id = getState().reservedMeetingList.room_id;
        const sort = getState().reservedMeetingList.sort;

        const payload = {
            searchText,
            start : new Date(start).getTime()/1000,
            end : new Date(end).getTime()/1000,
            room_id,
            sort : sort ? parseInt(sort) : 2,
            "authToken" : `Bearer ${getState().authenticate_user.auth_token}`
        };

        console.log("Payload = ",payload);

        const url = buildUrl(`roomreservation/get_meeting_list/${pageNo}`);

        dispatch(setFetchingMeetingList());

        axios.post(url,payload).then((res)=>{


            if(res.status===200){
                console.log("Response data = ",res.data);
                if(res.data["status"]==="success"){
                    dispatch(setFetchingMeetingListSuccessful(res.data["data"]));
                }
                else{
                    dispatch(setFetchingMeetingListFailure(res.data["message"]));
                    checkIfAuthFailed(res);
                }
            }
            else{
                dispatch(setFetchingMeetingListFailure("Failed to fetch meeting list"));
            }

        }).catch((err)=>{
            console.error(err);
            dispatch(setFetchingMeetingListFailure(err.message));
        })
    }   
}

export default getReservedMeetingList;