import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody,Button} from "shards-react";
import PageTitle from "../../../components/common/PageTitle";
import AddRoomForm from "./addRoomForm";
import RoomImages from "./roomImages";
import RoomFeature from "./roomFeatures/index";
import RoomDownTime from "./roomDownTime";
import { Link } from 'react-router-dom';
import { addRoom } from '../../../store/rooms/addRoom/addRoomSlice';
import { useDispatch, useSelector } from "react-redux";
import { AtomSpinner } from "react-epic-spinners";

const AddRoom = () =>{

    const dispatch = useDispatch();

    const loading = useSelector(state => state.addRoom.loading);
    const errMessage = useSelector(state => state.addRoom.errMessage);
    const successMessage = useSelector(state=>state.addRoom.successMessage);

    return (
        <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
            <PageTitle sm="4" title="Add" subtitle="Rooms" className="text-sm-left" />   
        </Row>
        {
            (!loading) &&
            <Row>
                <Col md={6} lg={6} sm={12} xs={12} style={{marginBottom:"20px"}} >
                    <Button size={"sm"} onClick={()=>{dispatch(addRoom())}} theme="primary">Add</Button>
                    <Link to="/rooms" style={{marginLeft:"10px"}}><Button size={"md"} theme="danger">Cancel</Button></Link>
                </Col>
            </Row>
        }
        {
            (!loading) && (errMessage) &&
            <div>
                <p style={{color:"red",marginTop:"10px"}}>{errMessage}</p>
            </div>
        }
        {
            (!loading) && (successMessage) &&
            <div>
                <p style={{color:"green",marginTop:"10px"}}>{successMessage}</p>
            </div>
        }
        {   
            (loading) &&
            <div style={{padding:"35px"}}>
                <center>
                    <AtomSpinner color={"blue"} />
                </center>
            </div>
        }
        {
        (!loading) && 
        <>
        <Row>
            <Col>
                <Card small className="mb-4">
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">Add Room</h6>
                    </CardHeader>
                    <CardBody className="p-0 pb-3">
                        <Col sm="12" md="12" style={{padding:"15px"}}>
                            <AddRoomForm />
                        </Col>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col>
                <Card small className="mb-4">
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">Room Images</h6>
                    </CardHeader>
                    <CardBody className="p-2 pb-3">
                        <Col sm="12" md="12" style={{padding:"15px"}}>
                            <RoomImages />
                        </Col>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col>   
                <RoomFeature />
                <RoomDownTime />
            </Col>
        </Row>
        </>
        }
        </Container>
    )
}

export default AddRoom;