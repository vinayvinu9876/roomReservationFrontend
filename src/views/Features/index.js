import React, { useEffect } from "react";
import {  Button } from "shards-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeatures } from '../../store/features/featuresSlice';
import CustomTablePage from "../../components/table";
import { Link } from "react-router-dom";

const Features = () =>{

  const dispatch = useDispatch();

  const loading = useSelector(state=>state.features.loading);
  const errMessage = useSelector(state=>state.features.errMessage);
  const featureData = useSelector(state=>state.features.featuresData);

  useEffect(()=>{ 
    dispatch(fetchFeatures());
  },[]);

  const columns = [
    {
      name : "#",
      selector : row => row.id,
      sortable : false
    },
    {
        name: 'Feature name',
        selector: row => row.feature_name,
        sortable: true,
        sortField: 'feature_name',
    },
    {
        name: 'Description',
        selector: row => row.feature_desc,
        sortable: true,
        sortField: 'capacity',
    },
    {
        name: 'Total Available',
        selector: row => row.total_available,
        sortable: true,
        sortField: 'total_available',
    },
    {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
        sortField: 'status',
    },
    {
      name : "Updated on",
      selector : row => row.updated_at,
      sortable : true,
      sortField : "updated_at"
    }
];


  console.log("Feature data at view = ",featureData);

  return (

    <CustomTablePage 
    pageName={"Features"}
    loading={loading}
    errMessage={errMessage}
    columns={columns}
    data={featureData}
    child={<Link to="/addFeature"><Button>Add Feature</Button></Link>}

    />
    /*
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Features" subtitle="Manage" className="text-sm-left" />
    </Row>

    <Row>
      <Col>
        <div style={{marginBottom:"10px"}}>
          <Link to="/addRoom"><Button>Add New Feature</Button></Link>
        </div>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Features</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            {
              (loading) && 
              <center><AtomSpinner color="blue"> </AtomSpinner></center>
            }
            {
                  (errMessage) && (!loading) &&
                  <center>
                  <div style={{padding:"30px"}}>
                    <p style={{color:"red"}}>{errMessage}</p>
                  </div>
                  </center>
            }
            {

              (!loading) && (!errMessage) &&

              <DataTable
                columns={columns}
                data={featureData}
                className="table mb-0"
              />
              
            /*<table className="table mb-0">
              
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    #
                  </th>
                  <th scope="col" className="border-0">
                    Room Name
                  </th>
                  <th scope="col" className="border-0">
                    Capacity
                  </th>
                  <th scope="col" className="border-0">
                    Status
                  </th>
                  <th scope="col" className="border-0">
                    Last Updated
                  </th>
                  <th scope="col" className="border-0">
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                
                {
                  roomsData.map((val,index)=>{
                    return (
                      <tr>
                        <td>{index+1}</td>
                        <td>{val["room_name"]}</td>
                        <td>{val["room_capacity"]}</td>
                        <td>{val["status"]}</td>
                        <td>{val["updated_at"]}</td>
                        <td><Button>View</Button></td>
                      </tr>
                    )
                  })
                }
                
              </tbody>
            </table>
          }
          </CardBody>
        </Card>
      </Col>
    </Row>

    
  </Container>*/
  );
}

export default Features;
