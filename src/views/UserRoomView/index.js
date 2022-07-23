import React,{useEffect,useState} from 'react';
import { Container,Row, Col } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import RoomHead from './RoomHead';
import ReserveRoomForm from './ReserveRoomForm';
import { useDispatch , useSelector } from 'react-redux';
import fetchRoomData from '../../store/UserRoomView/fetchRoomData';
import RoomDesc from './RoomDesc';
import RoomScheduleCalendar from './RoomScheduleCalendar';
import  { Toaster } from 'react-hot-toast';
import {AtomSpinner} from 'react-epic-spinners';

const UserRoomView = () => {

    const dispatch = useDispatch();

    const [room_id,setRoomId] = useState(null);

    const loading = useSelector(state=>state.userRoomView.loading);
    const errMessage = useSelector(state=>state.userRoomView.errMessage);
    const roomData = useSelector(state=>state.userRoomView.roomData);

    useEffect(()=>{
        console.log("url = ",window.location.href);
        const queryString = window.location.search.toString();
        console.log("Query string = ",queryString);
        const urlParams = new URLSearchParams(queryString);
        let roomID = urlParams.get('room_id');
        setRoomId(roomID);
        console.log("room id = ",roomID);
        if(roomID){
            dispatch(fetchRoomData(roomID));
        }

        console.log('room data = ',roomData);
    },[]);

    console.log("Room data = ",roomData," loading = ",loading);

    return (
        <>
            <Container fluid className="main-content-container px-4">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title={(roomData && roomData["room_data"]) ? roomData["room_data"]["room_name"] : ""} subtitle={"View"} className="text-sm-left" />
                </Row>

                <Toaster />
                <div style={{paddingTop:"20px"}}></div>
                <Col style={{marginBottom : "20px"}}>

                    {
                        loading &&
                        <div style={{width:"100%",height:"200px",alignContent:"center",padding:"15px"}}>
                            <center><AtomSpinner color={"blue"} /></center>
                        </div>
                    }
                    {
                    (roomData!==null && (!loading) && (!errMessage)) &&
                    <>
                        <RoomHead roomData={roomData.room_data} features={roomData.room_features} media={roomData.room_media}/>
                        <RoomDesc room_desc={roomData ? (roomData["room_data"] ?  roomData["room_data"]["room_desc"] : "" ) : ""} room_id={room_id}  />
                        {
                        
                            <RoomScheduleCalendar roomDownTime={roomData ? roomData["room_down_time"] : []} room_id={room_id}/>
                        
                        }
                        <ReserveRoomForm room_id={room_id} />
                    </>
                    } 
                </Col>
            </Container>
        </>
    )

}

export default UserRoomView;