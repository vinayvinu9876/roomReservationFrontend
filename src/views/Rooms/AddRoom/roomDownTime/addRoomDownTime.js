import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Row,
    Col,
    Form,
    FormSelect,
    FormInput,
    Button
} from "shards-react";
import { addRoomDownTime } from '../../../../store/rooms/addRoom/addRoomSlice';

const AddRoomDownTime = () =>{  

    const dispatch = useDispatch();

    const [day,setDay] = useState(null);
    const [start,setStartTime] = useState(null);
    const [end,setEndTime] = useState(null);
    const [desc,setDescription] = useState(null);

    return (
        <Form>
            <Row form>
                <Col md="4" lg={4} sm={12} xs={12} className="form-group">
                    <label>Day</label>
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
                </Col>
                <Col md="4" lg={4} sm={12} xs={12} className="form-group">
                    <label>Start</label>
                    <FormInput
                        type="time"
                        value={start}
                        onChange={(evt) => {
                            setStartTime(evt.target.value);
                        }}
                    />
                </Col>
                <Col md="4" lg={4} sm={12} xs={12} className="form-group">
                    <label>End</label>
                    <FormInput
                        type="time"
                        value={end}
                        onChange={(evt) => {
                            setEndTime(evt.target.value);
                        }}
                    />
                </Col>
            </Row>
            <Row form>
                <Col md="12" lg={12} sm={12} xs={12} className="form-group">
                    <label>Description</label>
                    <FormInput
                        type="text"
                        placeholder={"Description"}
                        value={desc}
                        onChange={(evt) => {
                            setDescription(evt.target.value);
                        }}
                    />
                </Col>
            </Row>
            <Row form>
                <Col>
                    <Button theme="primary" onClick={
                        ()=>{
                            dispatch(addRoomDownTime({day,start,end,desc}));
                        }
                    }>Add Down Time</Button>
                </Col>
            </Row>
        </Form>
    )

}

export default AddRoomDownTime;