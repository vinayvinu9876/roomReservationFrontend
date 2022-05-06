import React from 'react';
import AddRoomFeatureForm from './addRoomFeatureForm';
import { Col,Card,CardHeader,CardBody } from 'shards-react';
import SelectedFeatureTable from './SelectedFeatureTable';

const RoomFeature = () =>{
    return (
        <> 
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <h6 className="m-0">Room Features</h6>
                </CardHeader>
                <CardBody className="p-2 pb-3">
                    <Col sm="12" md="12" style={{padding:"15px"}}>
                        <AddRoomFeatureForm />
                    </Col>
                </CardBody>
            </Card>
            <SelectedFeatureTable />
        </>
    )
}


export default RoomFeature;