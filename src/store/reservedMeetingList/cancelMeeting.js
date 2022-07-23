import axios from 'axios';
import toast from 'react-hot-toast';
import buildUrl from '../../utils/buildUrl';
import { getReservedMeetingList, setCancellingMeeting, setCompletedCancelMeeting } from './reservedMeetingListSlice';


const cancelMeeting = (reservation_id) => {

    return (dispatch,getState)=>{

        if(!reservation_id){
            toast.error("Reservation id not found");
            return;
        }

        if(!window.confirm("Are you sure ? ")){
            return;
        }

        dispatch(setCancellingMeeting());

        const url = buildUrl(`room/cancel_meeting/${reservation_id}`);

        axios.get(url).then((res)=>{
            console.log("Cancel response = ",res.data);
            if(res.status===200){
                if(res.data["status"]==="success"){
                    toast.success("Reservation Cancelled succesfully");
                    let pageNo = getState().reservedMeetingList.pageNo;
                    dispatch(getReservedMeetingList(pageNo));
                }
                else{
                    toast.error(res.data["message"]);
                }
            }
            else{
                toast.error("Server error ",res.status);
            }
            dispatch(setCompletedCancelMeeting());
        }).catch((err)=>{
            console.error(err);
            toast.error(err.message);
        })

    }

}

export default cancelMeeting;