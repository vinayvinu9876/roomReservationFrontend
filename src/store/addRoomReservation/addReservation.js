import axios from 'axios';
import { setAddRoomReservationFailure, setAddingRoomReservation, setAddRoomReservationSuccess  } from './addRoomReservationSlice';
import buildUrl from '../../utils/buildUrl';
import { fetchRoomsSchedule } from '../roomSchedule/roomScheduleSlice';

const addReservation = ({room_id=null,meetingTitle=null,organizedBy=null,meetingDesc=null,date=null,startTime=null,endTime=null,noOfAttendees=0,attendeesEmail=null}) => {

    return (dispatch,getState) => {

        dispatch(setAddingRoomReservation());

        if(!room_id){
            dispatch(setAddRoomReservationFailure("Room id is required"));
            return;
        }

        if(!meetingTitle){
            dispatch(setAddRoomReservationFailure("Meeting title must be added"));
            return;
        }

        if(!organizedBy){
            dispatch(setAddRoomReservationFailure("Organized by is required"));
            return;
        }

        if(!meetingDesc){
            dispatch(setAddRoomReservationFailure("Meeting desc must be added"));
            return;   
        }

        if(!date){
            dispatch(setAddRoomReservationFailure('Meeting date is required'));
            return;
        }

        if(!startTime){
            dispatch(setAddRoomReservationFailure("Start time is required"));
            return;
        }

        if(!endTime){
            dispatch(setAddRoomReservationFailure("End time is required"));
            return;
        }

        if(!noOfAttendees){
            dispatch(setAddRoomReservationFailure("No. of attendees must be added"));
            return;
        }

        let meetingDate = new Date(date);

        meetingDate.setHours(startTime.split(":")[0],startTime.split(":")[1]);
        startTime = (meetingDate.getTime()/1000);

        meetingDate.setHours(endTime.split(":")[0],endTime.split(":")[1]);
        endTime = (meetingDate.getTime()/1000);

        const payload = {
            room_id,
            reservation_description : meetingDesc,
            start_timestamp         : startTime,
            end_timestamp           : endTime,
            priority_id             : 4,
            attendees_email         : attendeesEmail,
            no_of_attendees         : noOfAttendees,
            reserved_by_email       : 'abc@notprovided.com',
            meeting_title           : meetingTitle,
            headed_by               : organizedBy
        };

        const url = buildUrl("roomreservation/reserve");

        axios.post(url,payload).then((res)=>{
            console.log("Status = ",res.status);

            if(res.status===200){
                if(res.data["status"]==="success"){
                    dispatch(setAddRoomReservationSuccess());
                    dispatch(fetchRoomsSchedule(room_id));
                }
                else{
                    dispatch(setAddRoomReservationFailure(res.data["message"]));
                }
            }
        }).catch((err)=>{
            console.error(err);
            dispatch(setAddRoomReservationFailure(err.message));
        })

    }
}

export default addReservation;