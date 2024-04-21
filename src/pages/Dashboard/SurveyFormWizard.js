import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Import necessary components and styles
import {
    Card, CardBody, Col, Container, FormGroup, Input, Label, NavItem, NavLink,
    Row, TabContent, TabPane, CardTitle, Button
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";

// Import Breadcrumb (assumed to be already implemented)
import Breadcrumbs from "../../components/Common/Breadcrumb";

const FormWizard = () => {
    document.title = "Form Wizard | HackUSU - Responsive Bootstrap 5 Admin Dashboard";
    const [activeTab, setActiveTab] = useState(1);

    // Setup initial form state
    const initialValues = {
        surveyName: '',
        startCode: '',
        phoneNumber: '',
        description: '',
        prompts: [{ prompt: "" }]
    };

    // Form validation schema
    const validationSchema = Yup.object({
        surveyName: Yup.string().required('Survey name is required'),
        startCode: Yup.string().required('Start code is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        description: Yup.string().required('Description is required'),
        prompts: Yup.array().of(
            Yup.object().shape({
                prompt: Yup.string().required('A prompt is required')
            })
        )
    });

    const onSubmit = values => {
        console.log(values);
        // API call to submit the final data
    };

    const addPrompt = (push) => {
        push({ prompt: "" });
    };

    const removePrompt = (remove, index) => {
        remove(index);
    };

    // Render Tab Pane Content
    const renderTabPane = (formikProps, arrayHelpers) => {
        switch (activeTab) {
            case 1:
                return (
                    <TabPane tabId={1}>
                        <Row>
                            <Col lg="4">
                                <FormGroup>
                                    <Label for="surveyName">Survey Name</Label>
                                    <Input
                                        id="surveyName"
                                        name="surveyName"
                                        type="text"
                                        placeholder="Enter your survey name"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        value={formikProps.values.surveyName}
                                    />
                                    <ErrorMessage name="surveyName" component="div" className="text-danger" />
                                </FormGroup>
                            </Col>
                            <Col lg="4">
                                <FormGroup>
                                    <Label for="startCode">Start Code</Label>
                                    <Input
                                        id="startCode"
                                        name="startCode"
                                        type="text"
                                        placeholder="Enter your survey start code"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        value={formikProps.values.startCode}
                                    />
                                    <ErrorMessage name="startCode" component="div" className="text-danger" />
                                </FormGroup>
                            </Col>
                            <Col lg="4">
                                <FormGroup>
                                    <Label for="phoneNumber">Phone</Label>
                                    {/* <select
                                  name="phone_id"
                                  onChange={formikProps.handleChange}
                                  onBlur={formikProps.handleBlur}
                                  value={formikProps.values.phoneNumber}
                                  className="form-control"
                                >
                                  <option value="">Select Phone</option>
                                  <option value="+14352131896">14352131896</option>
           
                                </select> */}
                                    {/* {dynamicOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))} */}
                                    <Input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="text"
                                        placeholder="Enter your survey phone number"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        value={formikProps.values.phoneNumber}
                                    />
                                    <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="12">
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input
                                        id="description"
                                        name="description"
                                        type="textarea"
                                        placeholder="Enter your survey description"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        value={formikProps.values.description}
                                    />
                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                </FormGroup>
                            </Col>
                        </Row>

                        <React.Fragment>
                            {/* <Button
                                to="#"
                                onClick={() => {
                                    setActiveTab(activeTab - 1)
                                }}
                            >
                                Previous
                            </Button> */}

                            <Row>
                                <Col lg="10"></Col>
                                <Col lg="1">

                                </Col>
                                <Col lg="1">
                                    <div className="d-grid">
                                        <input
                                            type="button"
                                            className="btn btn-primary"
                                            value="Next"
                                            onClick={() => {
                                                setActiveTab(activeTab + 1)
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </React.Fragment>

                    </TabPane>
                );
            case 2:
                return (
                    <TabPane tabId={2}>

                        <FieldArray name="prompts">
                            {({ insert, remove, push }) => (
                                <>
                                    {formikProps.values.prompts.length > 0 &&
                                        formikProps.values.prompts.map((prompt, index) => (

                                            // {formikProps.values.prompts.map((prompt, index) => (

                                            <Row key={index}>
                                                <Col lg={10}>
                                                    <FormGroup>
                                                        <Label>Prompt {index + 1}</Label>
                                                        <Input
                                                            name={`prompts[${index}].prompt`}
                                                            type="textarea"
                                                            onChange={formikProps.handleChange}
                                                            onBlur={formikProps.handleBlur}
                                                            value={prompt.prompt}
                                                            rows="5"
                                                        />
                                                        <ErrorMessage name={`prompts[${index}].prompt`} component="div" className="text-danger" />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={2} className="align-self-center">
                                                    <div className="d-grid">
                                                        <input
                                                            type="button"
                                                            className="btn btn-primary"
                                                            value="Remove"
                                                            onClick={() => removePrompt(remove, index)}
                                                        />
                                                    </div>
                                                </Col>
                                                {/* <Col lg={2}>
                                                    <Button color="danger" onClick={() => removePrompt(remove, index)}>Remove</Button>
                                                </Col> */}
                                            </Row>

                                        ))}


                                    <Button color="success" onClick={() => addPrompt(push)}>Add</Button>
                                </>
                            )}
                        </FieldArray>

                        <Row>
                            <Col lg="10"></Col>
                            <Col lg="1">
                                <div className="d-grid">
                                    <input
                                        type="button"
                                        className="btn btn-primary"
                                        value="Previous"
                                        onClick={() => {
                                            setActiveTab(activeTab - 1)
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col lg="1">
                                <div className="d-grid">
                                    <input
                                        type="button"
                                        className="btn btn-primary"
                                        value="Next"
                                        onClick={() => {
                                            setActiveTab(activeTab + 1)
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                );
            case 3:
                return (
                    <TabPane tabId={3}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                            <img src="http://localhost:8000/api/generate_qr_code?phone_number=4352131896&start_code=hello" alt="QR Code" />
                        </div>

                        <Row>
                            <Col lg="10"></Col>
                            <Col lg="1">
                                <div className="d-grid">
                                    <input
                                        type="button"
                                        className="btn btn-primary"
                                        value="Previous"
                                        onClick={() => {
                                            setActiveTab(activeTab - 1)
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col lg="1">
                                <div className="d-grid">
                                    <input
                                        type="button"
                                        className="btn btn-primary"
                                        value="Next"
                                        onClick={() => {
                                            setActiveTab(activeTab + 1)
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                );
            case 4:
                return (
                    <TabPane tabId={4}>
                        <div className="row justify-content-center">
                            <Col lg="6">
                                <div className="text-center">
                                    <div className="mb-4">
                                        <i className="mdi mdi-check-circle-outline text-success display-4" />
                                    </div>
                                    <h5>Confirm Detail</h5>
                                    <p className="text-muted">Your survey should be ready to go!</p>
                                    <Button color="primary" type="submit">Submit Survey</Button>
                                </div>
                            </Col>
                        </div>

                        {/* <Row>
                                <Col lg="10"></Col>
                                <Col lg="1">
                                    <div className="d-grid">
                                        <input
                                            type="button"
                                            className="btn btn-primary"
                                            value="Previous"
                                            onClick={() => {
                                                setActiveTab(activeTab - 1)
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col lg="1">

                                </Col>
                            </Row> */}
                    </TabPane>
                );
            default:
                return null;
        }
    };

    return (
        <React.Fragment>
            <Row>
                <Col lg="12">
                    <Card>
                        <CardBody>
                            <h4 className="card-title mb-4">Survey Wizard</h4>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >

                                {formikProps => (
                                    <Form>
                                        <div className="vertical-wizard wizard clearfix vertical">
                                            <div className="steps clearfix">
                                                <ul>
                                                    <NavItem
                                                        className={classnames({ current: activeTab === 1 })}>
                                                        <NavLink
                                                            className={classnames({ active: activeTab === 1 })}
                                                            onClick={() => { setActiveTab(1); }}
                                                        >
                                                            <span className="number">1.</span> Survey Details
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem
                                                        className={classnames({ current: activeTab === 2 })}>
                                                        <NavLink
                                                            className={classnames({ active: activeTab === 2 })}
                                                            onClick={() => { setActiveTab(2); }}
                                                        >
                                                            <span className="number">2.</span> Prompts
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem
                                                        className={classnames({ current: activeTab === 3 })}>
                                                        <NavLink
                                                            className={classnames({ active: activeTab === 3 })}
                                                            onClick={() => { setActiveTab(3); }}
                                                        >
                                                            <span className="number">3.</span> Share
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem
                                                        className={classnames({ current: activeTab === 4 })}>
                                                        <NavLink
                                                            className={classnames({ active: activeTab === 4 })}
                                                            onClick={() => { setActiveTab(4); }}
                                                        >
                                                            <span className="number">4.</span> Confirm Detail
                                                        </NavLink>
                                                    </NavItem>
                                                </ul>
                                            </div>
                                            <div className="content clearfix">
                                                <TabContent
                                                    activeTab={activeTab}
                                                    className="body"
                                                >
                                                    {/* <div className="vertical-wizard wizard clearfix vertical"> */}

                                                    {renderTabPane(formikProps, formikProps.getFieldHelpers('prompts'))}


                                                    {/* </div> */}
                                                </TabContent>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default FormWizard;
