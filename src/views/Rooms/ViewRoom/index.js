import React, { useEffect, useState } from 'react';
import { Container,Row,Col } from 'shards-react';
import PageTitle from '../../../components/common/PageTitle';
import RoomFeatureView from './RoomFeaturesView';
import RoomDownTimeView from './RoomDownTimeView';
import RoomImagesView from './RoomImagesView';
import { useDispatch, useSelector } from 'react-redux';
import { viewRoom } from '../../../store/rooms/viewRoom/viewRoomSlice';
import RoomDataView from './RoomDataView';

const ViewRoom = () =>{

    const dispatch = useDispatch();

    const [room_id,setRoomId] = useState(null);

    useEffect(()=>{
        console.log("url = ",window.location.href);
        const queryString = window.location.search.toString();
        console.log("Query string = ",queryString);
        const urlParams = new URLSearchParams(queryString);
        let roomID = urlParams.get('room_id');
        setRoomId(roomID);
        console.log("room id = ",roomID);
        dispatch(viewRoom(roomID));
    },[]);

    const roomData = useSelector(state=>state.viewRoom.room_data);
    const errMessage = useSelector(state=>state.viewRoom.errMessage);

    console.log("room data = ",roomData);

    return (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle sm="4" title="Room" subtitle="View" className="text-sm-left" />
            </Row>
            {
                (errMessage!==null) &&
                <p style={{color:"red"}}>{errMessage}</p>
            }
            
            <RoomDataView room_id={room_id} />

            <Row>
                <Col>
                    <RoomImagesView room_id={room_id}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <RoomFeatureView room_id={room_id} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <RoomDownTimeView room_id={room_id}/>
                </Col>
            </Row>
            
            {
                (errMessage!==null) &&
                <p style={{color:"red"}}>{errMessage}</p>
            }
            
        </Container>
    )   
}

export default ViewRoom;