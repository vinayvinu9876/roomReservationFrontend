import React from "react";
import { useSelector , useDispatch } from "react-redux";
import { incrementRoomFeature,decrementRoomFeature,removeFromRoomFeatures } from "../../../../store/rooms/addRoom/addRoomSlice";
import { Card,CardHeader,CardBody,ButtonGroup,Button } from "shards-react";

const SelectedFeatureTable = () =>{ 

    const dispatch = useDispatch();

    const selectedFeatureData = useSelector(state=>state.addRoom.room_features);

    return (
        <>
        {
        ( selectedFeatureData.length > 0 ) &&
        <Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <h6 className="m-0">Room Features List</h6>
                </CardHeader>
                <CardBody className="p-0 pb-3">
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
                                selectedFeatureData.map((val,index)=>{
                                    return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{val["feature_name"]}</td>
                                            <td>{val["no_of_items"]}</td>
                                            <td>
                                                <ButtonGroup className="mb-3">
                                                    <Button 
                                                        onClick={()=>{
                                                            dispatch(incrementRoomFeature({
                                                                feature_id : val["feature_id"],
                                                                value : 1,
                                                            }))
                                                        }}
                                                        theme="primary">
                                                            <i className="material-icons mr-1">add</i>
                                                    </Button>
                                                    <Button 
                                                        onClick={()=>{
                                                            dispatch(decrementRoomFeature(
                                                                {feature_id: val["feature_id"],value : 1}
                                                            ))
                                                        }}
                                                        theme="white">
                                                            <i className="material-icons mr-1">remove</i>
                                                    </Button>
                                                    <Button 
                                                        onClick={()=>{dispatch(removeFromRoomFeatures({feature_id:val["feature_id"]}))}}
                                                        theme="danger">
                                                            <i className="material-icons mr-1">clear</i>
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        }
        </>
    )

}

export default SelectedFeatureTable;