import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card,CardHeader,CardBody,Button,Row,Col } from 'shards-react';
import { removeRoomImage } from '../../../store/rooms/viewRoom/viewRoomSlice';
import { addImage } from '../../../store/rooms/viewRoom/viewRoomSlice';
import { ImagePicker } from 'react-file-picker';

const RoomImagesView = ({room_id}) =>{

    const dispatch = useDispatch();
    const roomImages = useSelector(state=>state.viewRoom.room_media);

    if(!roomImages){
        return <></>;
    }

    return (    
        <>
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <h6 className="m-0">Room Images</h6>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                    {
                    roomImages.length>0 &&
                    <Row>
                        {
                            roomImages.map((val,index)=>{
                                return (
                                    <Col key={"roomImage"+index} md={3} lg={3} xs={12} sm={12}>
                                        <div  key={"selectedImage"+index} >
                                            <center>
                                                <img 
                                                    alt={"Selected Room image "+index} 
                                                    key={"image"+index} 
                                                    style={{margin:"15px"}} 
                                                    height={180} 
                                                    width={250} 
                                                    src={val["image"]} />
                                            </center>
                                            <center>
                                                <Button theme="danger" onClick={()=>{dispatch(removeRoomImage(room_id,val["media_id"]))}}>Remove</Button>
                                            </center>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                        <AddImageButton room_id={room_id}/>
                    </Row>
                    }
                </CardBody>
            </Card>
        </>
    )   
}

const AddImageButton = ({room_id}) =>{
    const dispatch = useDispatch();
    const boxStyle = {
        margin:"15px",
        height:180,
        width:250,
        borderWidth:1,
        borderStyle:"dashed",
        borderColor:"black",
        borderRadius:1,
        alignItems : "center",
        justifyContent : "center"
    };



    return (
        <Col md={3} lg={3} xs={12} sm={12}>
            <div> 
                <>
                    <center>
                        <div style={boxStyle}>
                            <i className="material-icons mr-1" style={{"fontSize": "150px",color:"#f2f2f2"}}>add</i>
                        </div>
                    </center>
                    <center>
                        <ImagePicker
                            extensions={['jpg', 'jpeg', 'png']}
                            dims={{minWidth: 50, maxWidth: 10000, minHeight: 50, maxHeight: 10000}}
                            onChange={base64 => {
                                dispatch(addImage(room_id,base64));
                            }}
                            onError={errMsg => {console.log("Error  = ",errMsg);}}
                        >
                            <Button theme="success">
                                Add
                            </Button>
                        </ImagePicker>
                    </center>
                </>
            
            </div>
        </Col>
    )
}

export default RoomImagesView;