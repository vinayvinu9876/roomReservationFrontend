import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card,CardHeader,CardBody,Button, FormSelect, FormInput } from "shards-react";
import addRoomDownTime from "../../../store/rooms/viewRoom/actions/addRoomDownTime";
import deleteRoomDowntime from "../../../store/rooms/viewRoom/actions/deleteRoomDownTime";

const RoomDownTimeView = ({room_id}) =>{

    const dispatch = useDispatch();

    const downTimeData = useSelector(state=>state.viewRoom.room_down_time);

    return (
        <Card small className="mb-4">
            <CardHeader className="border-bottom">
                <h6 className="m-0">Down Time </h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                    <thead className="bg-light">
                        <tr>
                            <th>#</th>
                            <th>Day</th>
                            <th>Start </th>
                            <th>End</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            downTimeData.map((val,index)=>{
                               return ( 
                                    <tr key={"downtimeview"+index}>
                                        <td>{index+1}</td>
                                        <td>{val["day"].toUpperCase()}</td>
                                        <td>{val["start"]}</td>
                                        <td>{val["end"]}</td>
                                        <td>{val["desc"]}</td>
                                        <td>
                                            <Button theme="danger" onClick={()=>{ dispatch(deleteRoomDowntime(room_id,val["id"]));}}>
                                                <i className="material-icons mr-1">close</i>
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        <AddRoomDownTime room_id={room_id}/>
                    </tbody>
                </table>
            </CardBody>
        </Card> 
    );
}


const AddRoomDownTime = ({room_id}) =>{

    const dispatch = useDispatch();

    const [day,setDay] = useState(null);
    const [start,setStart] = useState(null);
    const [end,setEnd] = useState(null);
    const [desc,setDesc] = useState(null);


    const addDownTime = () =>{

        if(!day){
            window.alert("Please add day");
            return;
        }

        if(!start){
            window.alert("Please add start time");
            return;
        }

        if(!end){
            window.alert("Please add end time");
            return;
        }

        if(!desc){
            window.alert("Please add description");
            return;
        }


        dispatch(addRoomDownTime(room_id,day,start,end,desc));

    }

    return (
        <tr>
            <td></td>
            <td>
                <FormSelect 
                        value={day}
                        onChange={(evt) => {
                            setDay(evt.target.value);
                        }}>
                        <option value={null}>Choose...</option> 
                        <option value={"mon"}>Monday</option> 
                        <option value={"tue"}>Tuesday</option> 
                        <option value={"wed"}>Wednesday</option> 
                        <option value={"thu"}>Thursday</option> 
                        <option value={"fri"}>Friday</option> 
                        <option value={"sat"}>Saturday</option>
                        <option value={"sun"}>Sunday</option> 
                    </FormSelect>
            </td>
            <td>
                <FormInput
                    type="time"
                    placeholder="Start"
                    value={start}
                    onChange={(evt) => {
                        setStart(evt.target.value);
                     }}
                />
            </td>
            
            <td>
                <FormInput
                    type="time"
                    placeholder="end"
                    value={end}
                    onChange={(evt) => {
                        setEnd(evt.target.value);
                     }}
                />
            </td>
            <td>
                <FormInput
                    type="text"
                    placeholder="Description"
                    value={desc}
                    onChange={(evt) => {
                        setDesc(evt.target.value);
                     }}
                />
            </td>
            <td>
                <Button type="primary" onClick={()=>{addDownTime()}}>Add</Button>
            </td>
        </tr>
    )

}

export default RoomDownTimeView;