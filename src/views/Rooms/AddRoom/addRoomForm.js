import React from "react";
import {
    Row,
    Col,
    Form,
    FormInput,
    FormSelect,
    FormGroup } from "shards-react";
import {useDispatch,useSelector} from 'react-redux';
import ReactQuill from "react-quill";
import {setFieldValue} from '../../../store/rooms/addRoom/addRoomSlice';
import { AtomSpinner } from "react-epic-spinners";

const AddRoomForm = ()=>{
    const dispatch = useDispatch();

    const loading = useSelector(state=>state.addRoom.loading);

    const room_name = useSelector(state=>state.addRoom.room_name);
    const room_desc = useSelector(state=>state.addRoom.room_desc);
    const room_capacity = useSelector(state=>state.addRoom.room_capacity);
    const status = useSelector(state=>state.addRoom.status);

    return (
            <>
            {
            (!loading) &&
            <Form>
                <FormGroup>
                    <label>Room Name</label>
                    <FormInput
                        type="text"
                        placeholder="Room name"
                        value={room_name}
                        onChange={
                            (evt) => {
                                dispatch(setFieldValue({fieldName:"room_name",value:evt.target.value}));
                            }
                        }
                    />
                </FormGroup>
                <FormGroup>
                    <label>Room Description</label>
                    <ReactQuill 
                        bounds={'.app'}
                        placeholder={"Room Description"}
                        value={room_desc}
                        onChange={
                            (value)=>{
                                dispatch(setFieldValue({fieldName:"room_desc",value:value}));
                            }
                        }
                        
                    />
                </FormGroup>
                <Row form>
                    <Col md="7">
                        <label>Room Capacity</label>
                        <FormInput 
                            placeholder={"Room capacity"}
                            value={room_capacity} 
                            type="number" 
                            onChange={(evt) => {
                                dispatch(setFieldValue({fieldName:"room_capacity",value:evt.target.value}));
                            }}/>
                    </Col>
                    <Col md="5" className="form-group">
                        {/*active,inactive,under_maintenance,cleaning,temporarily_unavailable,permanently_unavailable*/}
                        <label>Status</label>
                        <FormSelect
                            value={status} 
                            onChange={(evt) => {
                                dispatch(setFieldValue({fieldName:"status",value:evt.target.value}));
                            }}>
                            <option>Choose ...</option>
                            <option value="active">Active</option>
                            <option value="inactive">In-Active</option>
                            <option value="under_maintenance">Under Maintenance</option>
                            <option value="cleaning">Cleaning</option>
                            <option value="temporarily_unavailable">Temporarily Unavailable</option>
                            <option value="permanently_unavailable">Permanently Unavailable</option>
                        </FormSelect>
                    </Col>
                </Row>
            </Form>
            }
            {
                (loading) &&
                <center>
                    <AtomSpinner  color={"blue"} />
                </center>
            }
        </>
        )
    
}

export default AddRoomForm;