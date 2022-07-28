import React, { useEffect, useState } from "react";
import {Row,Col,Card,CardHeader,CardBody,Button,Form ,FormInput} from 'shards-react';
import ReactQuill from "react-quill";
import addReservation from "../../store/addRoomReservation/addReservation";
import {useDispatch, useSelector} from 'react-redux';
import { AtomSpinner } from "react-epic-spinners";
import toast, { Toaster } from "react-hot-toast";

const ReserveRoomForm = ({room_id}) =>{

    const dispatch = useDispatch();

    const [meeting_title, setMeetingTitle] = useState("");
    const [organizedBy , setOrganizedBy] = useState("");
    const [meetingDesc, setMeetingDesc] = useState("");
    const [meetingDate, setMeetingDate] = useState(new Date().toISOString().split('T')[0]);
    const [meetingStartTime, setMeetingStartTime] = useState("00:00");
    const [meetingEndTime , setMeetingEndTime] = useState("00:00");
    const [no_of_attendees, setNoOfAttendees] = useState(0);
    const [attendees_email, setAttendeesEmail] = useState("");

    const loading = useSelector(state=>state.addRoomReservation.loading);

    const addRoomReservation = () =>{
        dispatch(
            addReservation({
                room_id : room_id,
                meetingTitle : meeting_title,
                organizedBy : organizedBy,
                meetingDesc : meetingDesc,
                date : meetingDate,
                startTime : meetingStartTime,
                endTime  : meetingEndTime,
                noOfAttendees : no_of_attendees,
                attendeesEmail : attendees_email
            })
        );

    }

    useEffect(()=>{
        onStartTimeChange(meetingStartTime);
        onEndTimeChange(meetingEndTime);
    },[meetingDate]);       

    useEffect(()=>{
        onStartTimeChange(meetingStartTime);
    },[meetingStartTime]);

    useEffect(()=>{
        onEndTimeChange(meetingEndTime);
    },[meetingEndTime]);

    const onStartTimeChange = (time) =>{
        console.log("Changed start time = ",time);
        
        if((!time) || (time==="00:00")){
            return;
        }
        
        const now = new Date();
        const hours = parseInt(time.split(":")[0]);
        const minutes  = parseInt(time.split(":")[1]);

        console.log("Meeting date = ",meetingDate);
        
        if( !(new Date(meetingDate).toDateString() ===  now.toDateString()) ){
            setMeetingStartTime(time);
            return;
        }

        if(hours < now.getHours()){
            setMeetingStartTime("00:00");
            toast.error("Please enter valid start time");
        }
        else if(hours===now.getHours() && minutes<(now.getMinutes()+5)){
            setMeetingStartTime("00:00");
            toast.error("Please enter valid start time");
        }
        else{
            setMeetingStartTime(time);
        }
        onEndTimeChange(meetingEndTime);
    }

    const onEndTimeChange = (time) =>{
        console.log("Changed end time = ",time);
        if((!time) || (time==="00:00")){
            return;
        }
        const endHours = parseInt(time.split(":")[0]);
        const endMinutes  = parseInt(time.split(":")[1]);

        const startHours = parseInt(meetingStartTime.split(":")[0]);
        const startMinutes = parseInt(meetingStartTime.split(":")[1]);

        if(startHours > endHours){
            setMeetingEndTime("00:00");
            toast.error("Please select valid end time");
        }
        else if(startHours===endHours && startMinutes===endMinutes){
            setMeetingEndTime("00:00");
            toast.error("Please select valid end time");
        }
        else{
            setMeetingEndTime(time);
        }
    }

        
    return (
        
        <Row id="roomReserveForm">
        <Col>
            <Toaster />
            <Card>
                <CardHeader className="border-bottom">
                    <h6 className="m-0">Reserve Room</h6>
                </CardHeader>
                <CardBody>
                    {
                        loading &&
                        <div style={{width:"100%",height:"100px"}}>
                            <center><AtomSpinner color={"blue"} /></center>
                        </div>
                    }
                    {
                    (!loading) &&
                    <Form>
                        <Row form>
                            <Col md={6} sm={12} xs={12} lg={6}>
                                <label htmlFor="feMeetingTitle">Meeting Title</label>
                                    <FormInput
                                        id="feMeetingTitle"
                                        type="text"
                                        placeholder="Meeting Title"
                                        value={meeting_title}
                                        onChange={(evt)=>{setMeetingTitle(evt.target.value);}}
                                    />
                            </Col>
                            <Col md={6} sm={12} xs={12} lg={6}>
                                <label>Organized By</label>
                                <FormInput
                                    type="text"
                                    placeholder="Organized By"
                                    value={organizedBy}
                                    onChange={(evt)=>setOrganizedBy(evt.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} lg={12} sm={12} xs={12} style={{marginTop:"20px"}}>
                                <label>Meeting Description and Requirements</label>
                                <ReactQuill 
                                    bounds={'.app'}
                                    placeholder={"Start Typing..."}
                                    value = {meetingDesc}
                                    onChange={
                                                (value)=>{
                                                    setMeetingDesc(value);
                                                }
                                            }   
                                    />
                            </Col>
                        </Row>

                        <Row style={{marginTop:"20px"}}>
                            <Col md={3} lg={3} sm={12} xs={12}>
                                <label>Date</label>
                                <FormInput
                                    type="date"
                                    placeholder="Date"
                                    value={meetingDate}
                                    min={new Date().toISOString().split("T")[0]}
                                    max={getDateAfter(30)}
                                    onChange={(evt)=>{setMeetingDate(evt.target.value);}}
                                />  
                            </Col>
                            <Col md={3} lg={3} sm={12} xs={12}>
                                <label>Start Time</label>
                                <FormInput
                                    type="time"
                                    placeholder="Start time"
                                    value={meetingStartTime}
                                    onChange={evt=>setMeetingStartTime(evt.target.value)}
                                />
                            </Col>
                            <Col md={3} lg={3} sm={12} xs={12}>
                                <label>End Time</label>
                                <FormInput
                                    type="time"
                                    placeholder="Date"
                                    value={meetingEndTime}
                                    onChange={evt=>setMeetingEndTime(evt.target.value)}
                                />
                            </Col>
                            <Col md={3} lg={3} sm={12} xs={12}>
                                <label>No. of Attendees</label>
                                <FormInput
                                    type="number"
                                    placeholder="No of Attendees"
                                    value={no_of_attendees}
                                    onChange={evt=>setNoOfAttendees(evt.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row style={{marginTop:"20px"}}>
                            <Col lg={12} sm={12} md={12} xs={12}>
                                <label>Attendees Email (comma seperated)</label><br />
                                <textarea
                                    rows={4}
                                    className='form-control'
                                    placeholder="Attendees Email"
                                    value={attendees_email}
                                    onChange={evt=>setAttendeesEmail(evt.target.value)}
                                ></textarea>
                            </Col>
                        </Row>
                        <Col style={{marginTop:"20px"}}>
                            <Row> 
                                <Button theme="danger">CANCEL</Button>
                                <Button style={{marginLeft:"20px"}} onClick={()=>{addRoomReservation()}} theme="primary">SUBMIT</Button>
                            </Row>
                        </Col>
                    </Form>
                    }
                </CardBody>
            </Card>
        </Col>
    </Row>
    )

}


function getDateAfter(days){
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result.toISOString().split("T")[0];
}

export default ReserveRoomForm;