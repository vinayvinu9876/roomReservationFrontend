import React, { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { Container, Row, Col, Card, CardHeader,CardBody,Button } from "shards-react";
import fetchPriority from "../../store/priority/fetchPriority";
import PageTitle from "../../components/common/PageTitle";
import EditPriority from "./EditPriority";
import { Link } from "react-router-dom";
import { AtomSpinner } from "react-epic-spinners";
import { Toaster } from 'react-hot-toast';

const Priority = () =>{

  const dispatch = useDispatch();

  const priorityData = useSelector(state=>state.priority.priorityData);
  const loading = useSelector(state=>state.priority.loading);
  const errMessage = useSelector(state=>state.priority.errMessage);

  useEffect(()=>{
    dispatch(fetchPriority());
  },[]);

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Priority" subtitle="Manage" className="text-sm-left" />
      </Row>

      {/* Default Light Table */}
      <Row>
        <Toaster />
        <Col>
          <Col style={{marginBottom:"10px",marginLeft:"0px",padding:"0px"}}>
            <Link to="/addPriority"><Button>Add Priority</Button></Link>
          </Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Priority</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">

              {
                (loading) &&
                <div style={{width:"100%",height:"200px",padding:"20px"}}>
                  <center><AtomSpinner color={"blue"} /></center>
                </div>
              }
              {
                (!loading) && (errMessage) &&
                <div style={{width:"100%",height:"200px",padding:"20px"}}>
                  <p style={{color:"red"}}>{errMessage}</p>
                </div>
              }
              {
              (!loading) && (!errMessage) &&
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      #
                    </th>
                    <th scope="col" className="border-0">
                      Priority No.
                    </th>
                    <th scope="col" className="border-0">
                      Role IDs
                    </th>
                    <th scope="col" className="border-0">
                      Name
                    </th>
                    <th scope="col" className="border-0">
                      Desc
                    </th>
                    <th scope="col" className="border-0">
                      Created on
                    </th>
                    <th scope="col" className="border-0">
                      Updated on
                    </th>
                    <th scope="col" className="border-0">
                      Status
                    </th>
                    <th scope="col" className="border-0">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    priorityData.map((val,index)=>{
                     return (
                     <tr key={"priority"+index}>
                        <td>{index+1}</td>
                        <td style={{fontWeight:"bold",color:"blue"}}>
                          #{val["priority_no"]} <br />
                          <span style={{color:"red"}}>{val["priority_no"]==="1"?"HIGHEST":""}</span>
                        </td>
                        <td>{val["role_ids"]}</td>
                        <td>{val["name"]}</td>
                        <td>{val["desc"]}</td>
                        <td>{new Date(val["created_on"]).toLocaleString()}</td>
                        <td>{new Date(val['updated_on']).toLocaleString()}</td>
                        <td style={{textTransform:"capitalize",color:(val["status"]==="inactive"?"red":"black")}}>{val["status"]}</td>
                        <td>
                          <EditPriority 
                            id={val["id"]}
                            priority_no={val["priority_no"]}
                            role_ids={val["role_ids"]}
                            name={val["name"]}
                            desc={val["desc"]}
                            status={val["status"]}
                          />
                        </td>
                      </tr>
                     );
                    })
                  }
                  
                </tbody>
              </table>
              }
            </CardBody>
          </Card>
        </Col>
      </Row>

    </Container>
    /*
      <CustomTablePage 
      pageName={"Priority"} 
      columns={columns} 
      loading={loading} 
      errMessage={errMessage} 
      data={priorityData}
      child={ <Link to="/addPriority"><Button>Add New Priority</Button></Link> }
      />
    */
  )

}




export default Priority;