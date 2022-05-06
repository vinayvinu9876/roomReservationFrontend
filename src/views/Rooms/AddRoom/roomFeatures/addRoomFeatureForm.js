import React, {  useState } from 'react';
import {
    Row,
    Col,
    FormInput,
    FormGroup,Button } from "shards-react";
import {useDispatch, useSelector} from 'react-redux';
import SelectFeatureList from './SelectFeatureList';
import { addRoomFeature } from '../../../../store/rooms/addRoom/addRoomSlice';

const AddRoomFeatureForm = () =>{

    const dispatch = useDispatch();

    const featuresData = useSelector(state => state.features.featuresData);

    const [selectedFeature, setSelectedFeature] = useState(null);
    const [no_of_items , setNoOfItems ] = useState(0);

    const onFeatureSelect = (id) => {
        let found = false;
        featuresData.forEach((feature)=>{
            if(feature["id"]===id){
                found = true;
                setSelectedFeature(feature);
            }
        });

        if(!found){
            setSelectedFeature(null);
        }
    }

    return (
            <Row form>
                <Col md="3" lg={3} sm={12} xs={12} className="form-group">
                        <label>Feature</label>
                        <SelectFeatureList onChange={onFeatureSelect}/>
                </Col>
                {
                    (selectedFeature!==null) &&
                    <Col md={3} lg={3} sm={12} xs={12}>
                        <FormGroup>
                            <label>Available</label>    
                            <FormInput
                                disabled
                                type="number"
                                value={selectedFeature["total_available"]}
                            />
                        </FormGroup>
                    </Col>
                }
                
                <Col md={3} lg={3} sm={12} xs={12}>
                    <FormGroup>
                        <label>No. of items</label>
                        <FormInput
                            type="number"
                            placeholder="No of items"
                            value={no_of_items}
                            onChange={(evt) => {
                                setNoOfItems(evt.target.value);
                            }}
                        />
                    </FormGroup>
                </Col>
                <Col md={3} lg={3} sm={12} xs={12}>
                   <Button style={{marginTop:"30px"}} theme="primary" onClick={()=>{
                       if(selectedFeature===null){
                           window.alert("Please select a feature");
                           return;
                       }
                       if(no_of_items===0){
                           window.alert("Please add no. of available items");
                           return;
                       }
                       const payload = {
                           "feature_id":selectedFeature["id"],
                           "feature_name":selectedFeature["feature_name"],
                           "no_of_items":no_of_items,
                           "total_available" : selectedFeature["total_available"]
                        };
                       dispatch(addRoomFeature(payload));
                   }}>Add</Button>
                </Col>
            </Row>
    )
}


export default AddRoomFeatureForm;