import React, { useEffect } from "react";
import { AtomSpinner } from "react-epic-spinners";
import { Container, Row, Col, Card, CardBody } from "shards-react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import PageTitle from "../components/common/PageTitle";
import { authenticate_user } from "../store/authenticateUser/authenticate_user_slice";
import { withRouter } from 'react-router-dom'

const AuthenticateUser = ({history}) =>{ 

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state=>state.authenticate_user.logged_in);
  const loading = useSelector(state=>state.authenticate_user.loading);
  const errMessage = useSelector(state=>state.authenticate_user.errMessage);

  useEffect(()=>{
    const queryString = window.location.search.toString();
    //console.log("Query string = ",queryString);
    const urlParams = new URLSearchParams(queryString);
    let encrypted_auth_data = urlParams.get('user_info');
    dispatch(authenticate_user(encrypted_auth_data));
  },[]);

  if(isLoggedIn){
      history.push("/user-rooms");
  }
  
  return (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Welcome" subtitle="Room Reservation" className="text-sm-left" />
    </Row>

    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardBody className="p-3 pb-3">
                { 
                  (!errMessage) && (!loading) &&
                  <div style={{marginTop:"20px"}}>
                    <center><h4>Please wait... Until i learn about you <span role="img" aria-label="naughty-emoji" aria-labelledby="emoji-good">😉</span></h4></center>
                  </div>
                }
                {
                  (errMessage) && (!loading) &&
                  <div style={{marginTop:"20px"}}>
                    <center><h4>{errMessage}</h4></center>
                  </div>
                }
                {
                  loading &&
                  <div style={{marginTop:"35px",marginBottom:"30px"}}>
                      <center><AtomSpinner color={"blue"} /></center>
                  </div>
                }
          </CardBody>
        </Card>
      </Col>
    </Row>

  </Container>
);
}
export default withRouter(AuthenticateUser);
