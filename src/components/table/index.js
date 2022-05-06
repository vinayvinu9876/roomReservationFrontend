import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../common/PageTitle";
import { AtomSpinner } from "react-epic-spinners";
import DataTable from "react-data-table-component";

const CustomTablePage = ({pageName, loading,errMessage,columns,data,child}) =>{

    return (
        <Container fluid className="main-content-container px-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
                <PageTitle sm="4" title={pageName} subtitle="Manage" className="text-sm-left" />
            </Row>

            <Row>
                <Col>
                    <div style={{marginBottom:"10px"}}>
                        {child}
                    </div>
                    <Card small className="mb-4">
                        <CardHeader className="border-bottom">
                            <h6 className="m-0">{pageName}</h6>
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
                                data={data}
                                className="table mb-0"
                            />
                        }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
    </Container>
    )

}

export default CustomTablePage;