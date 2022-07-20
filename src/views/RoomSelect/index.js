import React from "react";
import {Button,FormInput,Row,Col,FormSelect} from 'shards-react';

const RoomSelect = ({val,onChange}) => {

    const dispatch = useDispatch();

    return (
        <FormSelect id="feInputRoom" value={val} onChange={evt=>onChange(evt.target.value)}>
            <option value={null}>Select</option>
            <option>A35</option>
            <option>A36</option>
            <option>A37</option>
            <option>A38</option>
        </FormSelect>
    )

}

export default RoomSelect;
