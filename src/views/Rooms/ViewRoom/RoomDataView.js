import React, { useState } from 'react';
import {Row,Col,Card,CardHeader,CardBody,FormGroup,FormInput,FormSelect} from 'shards-react';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import { updateRoomName , updateRoomDesc, updateRoomCapacity , updateRoomStatus  } from '../../../store/rooms/viewRoom/actions/updateRoom';

const RoomDataView = ({room_id}) =>{

    const roomData = useSelector(state=>state.viewRoom.room_data);

    const dispatch = useDispatch();

    console.log("Room data at view = ",roomData);

    const fields = [
        {
            "fieldName" : "room_name",
            "displayName" : "Room Name",
            "editable"  : true,
            "onUpdate" : (value) => {
                dispatch(updateRoomName(room_id,value));
            },
            "editComponent" : (value,onChange) => 
                                    <FormGroup>
                                        <FormInput
                                            type="text"
                                            placeholder={value}
                                            onChange={
                                                (evt) => {
                                                    onChange(evt.target.value);
                                                    //dispatch(setFieldValue({fieldName:"room_name",value:evt.target.value}));
                                                }
                                            }
                                        />
                                    </FormGroup>            
        },
        {
            "fieldName" : "room_capacity",
            "displayName" : "Room Capacity",
            "editable"  : true,
            "onUpdate" : (value) => {
                dispatch(updateRoomCapacity(room_id,value));
            },
            "editComponent" : (value,onChange) => 
                                    <FormGroup>
                                        <FormInput
                                            type="number"
                                            placeholder={value}
                                            onChange={
                                                (evt) => {
                                                    onChange(evt.target.value);
                                                }
                                            }
                                        />
                                    </FormGroup>    
        },
        {
            "fieldName" : "status",
            "displayName" : "Status",
            "editable"  : true,
            "onUpdate"  : (value) => {
                dispatch(updateRoomStatus(room_id,value));
            },
            "editComponent" : (value,onChange) => 
                                    <FormGroup>
                                        <FormSelect
                                            value={value} 
                                            onChange={(evt) => {
                                                onChange(evt.target.value);
                                            }}>
                                                <option value={null}>Choose ...</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">In-Active</option>
                                                <option value="under_maintenance">Under Maintenance</option>
                                                <option value="cleaning">Cleaning</option>
                                                <option value="temporarily_unavailable">Temporarily Unavailable</option>
                                                <option value="permanently_unavailable">Permanently Unavailable</option>
                                        </FormSelect>
                                    </FormGroup>    
        },
        {
            "fieldName" : "updated_at",
            "displayName" :"Last Updated",
            "editable"  : false
        }
    ];
    return (
    <>
        <Row>
            {

                fields.map((val,index)=>{
                    return (   
                        <FieldValue index={index} 
                                    displayName={val["displayName"]} 
                                    editable={val["editable"]} 
                                    onUpdate={val["onUpdate"]}
                                    fieldValue={roomData===null ? "" : roomData[val["fieldName"]]}
                                    editComp={roomData===null?"":val["editComponent"]} />
                    );
                })
            }
        </Row>
        <Row>
            {
                (roomData!==null) &&
                <DescriptionEdit onUpdate={(value)=>{dispatch(updateRoomDesc(value))}} room_id={room_id} room_desc={roomData["room_desc"]} />
            }
        </Row>
    </>
    );
}

const FieldValue = ({index,onUpdate,displayName,editable,fieldValue,editComp}) => {

    const [editing,setEditing] = useState(false);

    const [value,setValue] = useState(fieldValue);

    const onDone = () =>{
        console.log("value = ",value," Field value = ",fieldValue);
        if(value===fieldValue){
            setEditing(false);
            return;
        }
        onUpdate(value);
        setEditing(false);
    }
    
    return (
        <Col key={"desc"+ displayName + index} md={3} lg={3} sm={12} xs={12}>
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <Row>
                        <Col md={10} lg={10} xs={10} sm={10}>
                            <h6 className="m-0">{displayName}</h6>
                        </Col>
                        {
                            (editable && (!editing) ) && 
                            <Col md={2} lg={2} xs={2} sm={2}>
                                <i onClick={()=>setEditing(!editing)} className="material-icons mr-1">edit</i>
                            </Col>
                        }
                        {
                            (editing) &&
                            <Col md={2} lg={2} xs={2}>
                                <i onClick={()=>onDone()} className="material-icons mr-1">done</i>
                            </Col>
                        }
                    </Row>
                </CardHeader>
                <CardBody className="p-3 pb-3"> 
                    {!editing && <p>{fieldValue}</p>}
                    {
                        (editing) &&
                        <>
                            {editComp(value,setValue)}
                        </>
                    }   
                </CardBody>
            </Card>
       </Col>
    )
}

const DescriptionEdit = ({room_id,room_desc}) =>{

    const [editing,setEditing] = useState(false);
    const [value,setValue] = useState(room_desc.toString());

    const dispatch = useDispatch();

    const onUpdate = () => {
        if(value === room_desc ){
            setEditing(false);
            return;
        }
        setEditing(false);
        dispatch(updateRoomDesc(room_id,value));
    }

    return (
        <Col md={12} lg={12} sm={12} xs={12}>
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <Row>
                        <Col md={2} lg={2} xs={10} sm={10}>
                            <h6 className="m-0">{"Description"}</h6>
                        </Col>
                        {
                            ((!editing) ) && 
                            <Col md={2} lg={2} xs={2} sm={2}>
                                <i onClick={()=>setEditing(!editing)} className="material-icons mr-1">edit</i>
                            </Col>
                        }
                        {
                            (editing) &&
                            <Col md={2} lg={2} xs={2}>
                                <i onClick={()=>onUpdate()} className="material-icons mr-1">done</i>
                            </Col>
                        }
                    </Row>
                </CardHeader>
                <CardBody className="p-3 pb-0">
                    {
                     
                        (!editing) &&
                        <div dangerouslySetInnerHTML={{__html: room_desc }} ></div>
                    
                    }
                    {
                        (editing) &&
                        <FormGroup>
                            <ReactQuill 
                                bounds={'.app'}
                                placeholder={"Room Description"}
                                value={value}
                                onChange={
                                    (newVal)=>{
                                        console.log("New value = ",newVal);
                                        setValue(newVal);
                                    }
                                }
                            />
                        </FormGroup>
                    }
                </CardBody>
            </Card>
        </Col>
    )

}

export default RoomDataView;