import React from 'react';
import { Container,Row,Col,Card,CardHeader,CardBody } from 'shards-react';
import PageTitle from "../../../components/common/PageTitle";
import AddFeatureForm from './addFeatureForm';

const AddFeature = () =>{
    return (
        <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
            <PageTitle sm="4" title="Feature" subtitle="Manage" className="text-sm-left" />
        </Row>
        <Row>
            <Col>
                <Card small className="mb-4">
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">Add Feature</h6>
                    </CardHeader>
                    <CardBody className="p-0 pb-3">
                        <Col sm="12" md="12" style={{padding:"15px"}}>
                            <AddFeatureForm />
                        </Col>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        </Container>
    );
}

export default AddFeature;