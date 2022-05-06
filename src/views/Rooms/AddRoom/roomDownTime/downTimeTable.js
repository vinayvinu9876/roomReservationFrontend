import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Card,CardHeader,CardBody,Button } from "shards-react";
import { removeFromDownTime } from "../../../../store/rooms/addRoom/addRoomSlice";


const DownTimeTable = () =>{

    const dispatch = useDispatch();

    const downTimeData = useSelector(state=>state.addRoom.room_down_time);

    return (
        <>
        {
        (downTimeData.length>0) &&
        <Card small className="mb-4">
            <CardHeader className="border-bottom">
                <h6 className="m-0">Down Time List</h6>
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
                               return ( <tr>
                                    <td>{index+1}</td>
                                    <td>{val["day"]}</td>
                                    <td>{val["start"]}</td>
                                    <td>{val["end"]}</td>
                                    <td>{val["desc"]}</td>
                                    <td>
                                        <Button theme="danger" onClick={()=>{dispatch(removeFromDownTime(index))}}>
                                            <i className="material-icons mr-1">close</i>
                                        </Button>
                                    </td>
                                </tr>);
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

export default DownTimeTable;