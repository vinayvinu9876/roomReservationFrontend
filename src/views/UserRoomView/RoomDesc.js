import React from 'react';
import {Row,Col,Card,CardHeader,CardBody} from 'shards-react';

const RoomDesc = ({room_id,room_desc}) => {

    if(!room_desc){
        return <></>;
    }

    return (
        <Row>
            <Col md={12} lg={12} xs={12} sm={12} style={{marginTop:"15px",marginBottom:"15px"}}>
                <Card>
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">Room Details</h6>
                    </CardHeader>
                    <CardBody dangerouslySetInnerHTML={{__html: room_desc}}>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )

}

export default RoomDesc;