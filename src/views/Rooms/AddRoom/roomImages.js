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
            reader.onload = e => {   
                let temp = [...roomImages];

                if(temp.includes(e.target.result)){
                    return;
                }
                temp.push(e.target.result);
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

        console.log("File list length = ",fileList.length);
        loadImages(fileList);
    };

    const removeImage = img => {

        const temp = [...roomImages];

        if(temp.includes(img)){
            const idx = temp.indexOf(img);
            temp.splice(idx,1);
            dispatch(addRoomImage(temp));
        }

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
                                <img alt={"Selected Room image "+index} key={"image"+index} style={{margin:"15px"}} height={150} width={150} src={val} />
                                <center><Button theme="danger" onClick={()=>{removeImage(val)}}>Remove</Button></center>
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