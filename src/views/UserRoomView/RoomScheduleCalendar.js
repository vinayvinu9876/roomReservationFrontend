import React, { useEffect } from 'react';
import {Row,Col,Card,CardHeader,CardBody} from 'shards-react';
import getDaysBetweenDates from '../../utils/getDaysBetweenDates';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import { useDispatch,useSelector } from 'react-redux';
//import fetchRoomsSchedule from '../../store/roomSchedule/fetchRoomsSchedule';
import {fetchRoomsSchedule} from '../../store/roomSchedule/roomScheduleSlice';

const RoomScheduleCalendar = ({room_id, roomDownTime}) => {
    //const loading = useSelector(state=>state.roomSchedule.loading);
    //const errMessage = useSelector(state=>state.roomSchedule.errMessage);

    let events = [];
    const dispatch = useDispatch();


    console.log("running");
    if(room_id){
        let roomDownTimeEvents = getRoomDownTimeEvents(roomDownTime);
        const roomScheduledData = getReservedDataAsEvents(useSelector(state=>state.roomSchedule.roomScheduleData));
        console.log("room scheduled data = ",roomScheduledData);
        events = roomDownTimeEvents.concat(roomScheduledData);
        console.log("Events = ",events);
    }

    useEffect(()=>{
        dispatch(fetchRoomsSchedule(room_id));
    },[]);

    return (
        <Row style={{marginTop:"20px",marginBottom:"20px"}}>
            <Col>
                <Card>
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">Room Schedule</h6>
                    </CardHeader>
                    <CardBody>  
                        <FullCalendar
                            plugins={[ timeGridPlugin  ]}
                            initialView="timeGridWeek"
                            slotMinTime={"08:00:00"}
                            slotMaxTime={"21:00:00"}
                            events={events}
                            selectAllow={false}
                            eventClick={(info)=>{console.log(info)}}
                            eventMouseEnter={(mouseEnterInfo)=>{console.log("Mouse enter info = ",mouseEnterInfo);}}
                        />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )

}

function getReservedDataAsEvents(roomReservationData){

    if(!roomReservationData){
        return [];
    }

    if(!Array.isArray(roomReservationData)){
        return [];
    }

    let events = [];

    roomReservationData.forEach((reservation)=>{
        let {start_timestamp,end_timestamp,meeting_title,headed_by} = reservation;

        events.push(
            {
                title: `${meeting_title} by ${headed_by}`, 
                start: new Date(start_timestamp).toISOString(),
                end :new Date(end_timestamp).toISOString(),
                eventColor : 'blue'
            }
        )
    });

    return events;
}

function getRoomDownTimeEvents(roomDownTime) {
    if(!roomDownTime){
        return [];
    }
    if(!Array.isArray(roomDownTime)){
        return [];
    }

    let events = [];
    roomDownTime.forEach(downTime => {
        let {day,start,end,created_at,desc} = downTime;
        let startDate = new Date(created_at).toISOString();
        let endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        
        let dates = getDaysBetweenDates(startDate,endDate,day);
        
        let startHour = start.split(":")[0];
        let startMin = start.split(":")[1];

        let endHour = end.split(":")[0];
        let endMin = end.split(":")[1];

        for(let i=0;i<dates.length;i++){

            //console.log("Date = ",dates[i]);
            //console.log("Start hour = ",startHour," start min =  ",startMin);

            let newStart = setHoursAndMinutes(dates[i],startHour,startMin);
            let newEnd   = setHoursAndMinutes(dates[i],endHour,endMin);

            //console.log("New start = ",newStart," New end = ",newEnd);
            if(isValidDate(newStart) && isValidDate(newEnd)){
                events.push({
                    title: desc, 
                    start: newStart.toISOString(),
                    end :newEnd.toISOString(),
                    eventColor : "red",
                    eventClick : ()=>{console.log("Event clicked");}
                });
            }
        }
    });

    return events;
}

const isValidDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

function setHoursAndMinutes(date,hours,minutes){
    let clonedDate = new Date(date.toLocaleDateString());

    clonedDate.setHours(hours);
    clonedDate.setMinutes(minutes);

    return clonedDate;
}

export default RoomScheduleCalendar;