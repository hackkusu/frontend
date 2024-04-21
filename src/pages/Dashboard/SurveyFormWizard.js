import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Import necessary components and styles
import {
    Card, CardBody, Col, Container, FormGroup, Input, Label, NavItem, NavLink,
    Row, TabContent, TabPane, CardTitle, Button
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { API_URL } from '../../helpers/api_helper';
// Import Breadcrumb (assumed to be already implemented)
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";


// actions
import { getSurveyDetail, addNewSurvey, getSurveys, updateSurvey, getPhones } from "../../store/actions"

import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

const FormWizard = (props) => {
    const [textareabadge, settextareabadge] = useState(0)
    const [textcount, settextcount] = useState(0)
    const [activeTab, setActiveTab] = useState(1);
    const dispatch = useDispatch();
    const [textareaCounts, setTextareaCounts] = useState({});

    // Setup initial form state
    const initialValues = {
        ...{
            surveyName: '',
            startCode: '',
            phoneNumber: '',
            description: '',
            prompts: [{ prompt: "" }]
        }, ...props.surveyDetail
    };

    const dynamicOptions = [
        { value: '1', label: 'Large select' },
        { value: '2', label: 'Small select' },
        // ... other options
    ];

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

    useEffect(() => {
        dispatch(getPhones());
        dispatch(getSurveyDetail(2));
    }, []);

    useEffect(() => {
        // // Fetch data function
        // const fetchData = () => {
        //     get('/api/get_highlight_responses')
        //         .then(data => setHighlightResponses(data))
        //         .catch(error => console.error('Error fetching highlight responses:', error));
        // };

        // // Initial fetch
        // fetchData();

        // // Pusher Configuration
        // const pusher = new Pusher('1bbaecb26111a9ad219d', {
        //     cluster: 'us3',
        //     encrypted: true
        // });

        // // Subscribe to the channel
        // const channel = pusher.subscribe('survey-response-channel');

        // // Bind to the update event
        // channel.bind('new-response', () => {
        //     fetchData(); // Fetch updated data when new data is available
        // });

        // // Cleanup
        // return () => {
        //     channel.unbind_all();
        //     channel.unsubscribe();
        // };
    }, []);


    const onSubmit = values => {
        console.log(values);
        // API call to submit the final data
    };

    const addPrompt = (push) => {
        push({ prompt: "" });
    };

    const removePrompt = (remove, index) => {
        remove(index);
        setTextareaCounts(prevCounts => ({
            ...prevCounts,
            [index]: 0
        }));
    };

    function textareachange(event, index) {
        const count = event.target.value.length;
        setTextareaCounts(prevCounts => ({
            ...prevCounts,
            [index]: count
        }));
    }

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
                                    <select
                                        name="phoneNumber"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        value={formikProps.values.phoneNumber}
                                        placeholder=""
                                        className="form-control"
                                    >
                                        <option value="">Select Phone</option>
                                        <option value="+14352131896">14352131896</option>

                                        {dynamicOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>

                                    {/* 
                                    <Input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="text"
                                        placeholder="Enter your survey phone number"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        value={formikProps.values.phoneNumber}
                                    /> */}
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
                                                            maxLength={160}
                                                            onChange={(args) => {
                                                                textareachange(args, index)
                                                                formikProps.handleChange(args)
                                                            }}
                                                            onBlur={formikProps.handleBlur}
                                                            value={prompt.prompt}
                                                            rows="5"
                                                        />
                                                        {/* {textareabadge ? (
                                                            <span className="badgecount badge bg-success" style={{ float: "right" }}>
                                                                {" "}
                                                                {textcount} / 160{" "}
                                                            </span>
                                                        ) : null} */}
                                                        {textareaCounts[index] > 0 && (
                                                            <span className="badgecount badge bg-success" style={{ float: "right" }}>
                                                                {textareaCounts[index]} / 160
                                                            </span>
                                                        )}
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
                            <Col xl="10" lg="8" xs="6" md="6" sm="6"></Col>
                            <Col xl="1" lg="2" xs="3" md="3" sm="3">
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
                            <Col xl="1" lg="2" xs="3" md="3" sm="3">
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
                            <img src={API_URL + "/api/generate_qr_code?phone_number=4352131896&start_code=hello"} alt="QR Code" />
                        </div>

                        <Row>
                            <Col xl="10" lg="8" xs="6" md="6" sm="6"></Col>
                            <Col xl="1" lg="2" xs="3" md="3" sm="3">
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
                            <Col xl="1" lg="2" xs="3" md="3" sm="3">
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



const mapStatetoProps = state => {

    const {
        surveys,
        surveyDetail,
        phones,
        error
    } = state.surveys;

    return { surveys, phones, surveyDetail, error };
};

export default connect(mapStatetoProps, {
    // getSurveys,
    // getSurveyDetail,
    // addNewSurvey,
})(withTranslation()(FormWizard));