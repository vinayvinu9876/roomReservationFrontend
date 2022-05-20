import React from "react";
import {
    Row,
    Col,
    Form,
    FormGroup, 
    Button
} from "shards-react";
import { addRoomImage } from "../../../store/rooms/addRoom/addRoomSlice";
import {useDispatch, useSelector} from 'react-redux';
import CustomFileUpload from "../../../components/components-overview/CustomFileUpload";

const RoomImages = () =>{

    const dispatch = useDispatch();

    const roomImages = useSelector(state=>state.addRoom.room_images);

    const loadImages = images => {
        for(var i=0;i<images.length;i++){
            let reader = new FileReader();
            const fname = images[i].name;
            reader.onload = e => {   
                let temp = [...roomImages];

                if(temp.includes(e.target.result)){
                    return;
                }
                
                const payload = {
                    image : e.target.result,
                    filename : fname
                };

                temp.push(payload);
                dispatch(addRoomImage(temp));
            }   
            reader.readAsDataURL(images[i]);
        }
    }

    const handleFileChange = evt => {
        const fileList = [];
        
        for(var i=0;i<evt.target.files.length;i++){
            fileList.push(evt.target.files[i]);
        };
        loadImages(fileList);
    };

    const removeImage = idx => {
        const temp = [...roomImages];
        temp.splice(idx,1);
        dispatch(addRoomImage(temp));
    }

    return (
        <>
        <Form>     
            <Row form>
                <FormGroup>
                    <CustomFileUpload onChange={handleFileChange} />
                </FormGroup>
            </Row>
        </Form>
        <Col>
            <Row>
                {
                    roomImages.map((val,index)=>{
                        return (
                            <div key={"selectedImage"+index}>
                                <img alt={"Selected Room image "+index} key={"image"+index} style={{margin:"15px"}} height={150} width={150} src={val["image"]} />
                                <br />
                                <center><span>{val["filename"]}</span></center>
                                <br />
                                <center><Button theme="danger" onClick={()=>{removeImage(index)}}>Remove</Button></center>
                            </div>
                        )
                    })
                }
            </Row>
        </Col>
        </>
    );

}

export default RoomImages;