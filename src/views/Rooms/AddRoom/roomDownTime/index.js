import React from 'react';
import {Col,Card,CardHeader,CardBody} from 'shards-react';
import AddRoomDownTime from './addRoomDownTime';
import DownTimeTable from './downTimeTable';

const RoomDownTime = () =>{


    return (
        <>
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <h6 className="m-0">Room Down Time</h6>
                </CardHeader>
                <CardBody className="p-2 pb-3">
                    <Col sm="12" md="12" style={{padding:"15px"}}>
                        <AddRoomDownTime />
                    </Col>
                </CardBody>
            </Card>
            <DownTimeTable />
        </>
    )
}

export default RoomDownTime;