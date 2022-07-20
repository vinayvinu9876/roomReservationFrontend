import React, { useState } from "react";
import { Card,CardHeader,CardBody,ButtonGroup,Button, FormInput } from "shards-react";
import { useDispatch, useSelector } from "react-redux";
import SelectFeatureList from "../AddRoom/roomFeatures/SelectFeatureList";
import deleteRoomFeature from "../../../store/rooms/viewRoom/actions/deleteRoomFeature";
import addFeature from "../../../store/rooms/viewRoom/actions/addFeature";

const RoomFeatureView = ({room_id}) =>{

    const roomFeatures = useSelector(state=>state.viewRoom.room_features);

    const dispatch = useDispatch();


    if(!roomFeatures){
        return <></>;
    }


    return (
        <Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <h6 className="m-0">Room Features</h6>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                    {
                    roomFeatures.length>0 &&
                    <table className="table mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th>#</th>
                                <th>Feature Name</th>
                                <th>No. of items</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                
                                roomFeatures.map((val,index)=>{
                                    return (    
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{val["feature_name"]}</td>
                                            <td>{val["no_of_items"]}</td>
                                            <td>
                                            <ButtonGroup className="mb-3">
                                                    <Button 
                                                        theme="primary">
                                                            <i className="material-icons mr-1">add</i>
                                                    </Button>
                                                    <Button 
                                                        theme="white">
                                                            <i className="material-icons mr-1">remove</i>
                                                    </Button>
                                                    <Button 
                                                        onClick={()=>{dispatch(deleteRoomFeature(room_id,val["id"]))}}
                                                        theme="danger">
                                                            <i className="material-icons mr-1">clear</i>
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <AddNewFeature room_id={room_id}/>
                            
                        </tbody>
                    </table>
                    }
                </CardBody>
            </Card>
    )
}

const AddNewFeature = ({room_id}) =>{

    const [featureId,setFeatureID] = useState(null);
    const [no_of_items,setNoOfItems] = useState(0);

    const dispatch = useDispatch();

    const add = () => {

        if(featureId===null){
            window.alert("feature id is not valid");
            return;
        }

        if(!no_of_items){
            console.log("Please add no. of items");
            window.alert("Please add no. of items");
            return;
        }

        dispatch(addFeature(featureId,room_id,no_of_items));
    }

    return (
        <tr>
            <td></td>
            <td><SelectFeatureList onChange={(val)=>{setFeatureID(val)}} /></td>
            <td><FormInput type="number" placeholder="No of items" onChange={(evt)=>{setNoOfItems(evt.target.value)}}/></td>  
            <td><Button theme="primary" onClick={()=>{add()}}>Add</Button></td>
        </tr>
    )

}   

export default RoomFeatureView;