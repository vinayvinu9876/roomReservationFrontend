import React, { useEffect } from "react";
import {FormSelect} from 'shards-react';
import {  useSelector, useDispatch } from "react-redux";
import fetchRooms from "../../store/rooms/fetchRooms";

const RoomSelect = ({val,onChange}) => {

    const dispatch = useDispatch();

    const rooms = useSelector(state=>state.rooms.rooms);

    useEffect(()=>{
        dispatch(fetchRooms());
    },[]);

    
    return (
        <FormSelect id="feInputRoom" value={val} onChange={evt=>onChange(evt.target.value==="All"?null:evt.target.value)}>
            <option value={null}>All</option>
            {
                rooms.map((val,index)=>{
                    return <option value={val["room_id"]}>{val["room_name"]}</option>
                })
            }
        </FormSelect>
    )

}

export default RoomSelect;
