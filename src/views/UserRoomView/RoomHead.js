import React from 'react';
import {Row,Col,Card,CardHeader,CardBody,Button} from 'shards-react';
import { Slide } from 'react-slideshow-image';


const RoomHead = ({roomData,features,media}) => {

    const slideImages = [];
    if(media){
        media.forEach((med)=>{
            slideImages.push({
                url : med["image"]
            });
        })
    }


    if(!roomData){
        return <></>;
    }

    return (
        <Row>
        <Col lg={4} md={4} xs={12} sm={12}>
            <div className="slide-container" style={{heigh:"400px"}}>
                <Slide>
                    {slideImages.map((slideImage, index)=> (
                        <div className="each-slide" key={index}>
                            <img
                                alt={`Room ${index}`}
                                src={slideImage["url"]}
                                height={"400px"}
                                width={"100%"}
                            />
                        </div>
                    ))} 
                </Slide>
            </div>
        </Col>
        <Col lg={8} md={8} xs={12} sm={12}>
            <Card>
                <CardHeader className="border-bottom">
                    <h6 className="m-0">{ roomData["room_name"] } Room</h6>
                </CardHeader>
                <CardBody>
                    <Col style={{margin:"0px",padding:"0px"}}>
                        <p> Room Seating Capacity : <span style={{fontWeight:"bold"}}>{ roomData["room_capacity"] }</span></p>
                        {features && features.length>0 && <h6 style={{fontWeight:"bold"}}>Features</h6>}
                        <Row>   
                            {
                                  features && features.map((val,index)=>{
                                        return (
                                            <div key={"feature"+index} style={{marginLeft:"10px"}}>
                                                 <span>
                                                    <i className="material-icons">arrow_right_alt</i>
                                                    <span style={{marginLeft:"5px"}}><span style={{fontWeight:"bold"}}>{val["total_available"]}</span>{val["feature_name"]}</span>
                                                </span>
                                            </div>
                                        )
                                    })
                            }
                            
                            
                        </Row>
                        <br />
                        <Col style={{margin:"0px",padding:"0px"}}>   
                            <h6 style={{fontWeight:"bold"}}>Notes</h6>
                            <div style={{marginLeft:"10px"}}>
                                <p style={{margin:"0px"}}>
                                    <i className="material-icons">arrow_forward</i>
                                    <span style={{marginLeft:"5px"}}>Meetings by higher officials can override your meeting</span>
                                </p>
                                <p style={{margin:"0px"}}>
                                    <i className="material-icons">arrow_forward</i>
                                    <span style={{marginLeft:"5px"}}> Please inform any issues as early as possible</span>
                                </p>
                                <p style={{margin:"0px"}}>
                                    <i className="material-icons">arrow_forward</i>
                                    <span style={{marginLeft:"5px"}}> Please inform any issues as early as possible</span>
                                </p>
                            </div>
                        </Col>
                    </Col>
                    <div style={{paddingTop:"20px"}}>
                        <a href="#roomReserveForm"><Button theme="primary">Reserve Now</Button></a>
                    </div>
                    
                </CardBody>
            </Card>
        </Col>
    </Row>
    )

}

export default RoomHead;