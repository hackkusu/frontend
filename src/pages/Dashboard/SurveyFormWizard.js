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
import toastr from "toastr";
import "toastr/build/toastr.min.css";

// actions
import { getSurveyDetail, addNewSurvey, getSurveys, updateSurvey, getSurveyQuestions, getPhones } from "../../store/actions"

import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

const FormWizard = (mainProps) => {
    const [textareabadge, settextareabadge] = useState(0)
    const [textcount, settextcount] = useState(0)
    const [activeTab, setActiveTab] = useState(1);
    const dispatch = useDispatch();
    const [textareaCounts, setTextareaCounts] = useState({});
    const [shareData, setShareData] = useState({});
    const [canProceed, setCanProceed] = useState(false);

    // Setup initial form state
    const initialValues = {
        ...{
            name: '',
            start_code: '',
            phone: '',
            description: '',
            prompts: [{ prompt: "" }]
        }, ...mainProps.surveyDetail
    };

    const dynamicOptions = Object.values(mainProps.phones);

    // Form validation schema
    const validationSchema = Yup.object({
        name: Yup.string().required('Survey name is required'),
        start_code: Yup.string().required('Start code is required'),
        phone: Yup.string().required('Phone number is required'),
        description: Yup.string().required('Description is required'),
        prompts: Yup.array().of(
            Yup.object().shape({
                prompt: Yup.string().required('A prompt is required')
            })
        )
    });

    function showErrorToast() {
        toastr.options = {
            positionClass: 'toast-bottom-right',
            // timeOut: timeOut,
            // extendedTimeOut: extendedTimeOut,
            // closeButton: closeButton,
            // debug: debug,
            // progressBar: progressBar,
            // preventDuplicates: preventDuplicates,
            // newestOnTop: newestOnTop,
            // showEasing: showEasing,
            // hideEasing: hideEasing,
            // showMethod: showMethod,
            // hideMethod: hideMethod,
            // showDuration: showDuration,
            // hideDuration: hideDuration
        };

        // setTimeout(() => toastr.success(`Settings updated `), 300)
        //Toaster Types
        // if (toastType === "info") toastr.info(message, title);
        // else if (toastType === "warning") toastr.warning(message, title);
        // else if (toastType === "error") toastr.error(message, title);
        // else toastr.success(message, title);
        toastr.error(mainProps.error?.message, mainProps.error?.name)
    }

    function showSuccessToast() {
        toastr.options = {
            positionClass: 'toast-bottom-right',
        };

        toastr.success('Saved successfully.', 'Success!');
    }

    function clearToast() {
        toastr.clear();
    }

    useEffect(() => {
        dispatch(getPhones());
        // dispatch(getSurveyDetail(2));
    }, []);

    useEffect(() => {
        if (mainProps.error?.message) {
            console.log('error', mainProps.error)
            showErrorToast();
        }
    }, [mainProps.error])

    useEffect(() => {
        if (mainProps.success) {
            console.log('success', mainProps.success)
            showSuccessToast();
            setCanProceed(true);
        }
    }, [mainProps.success])

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
        setShareData({ start_code: values.start_code, phone_number: Object.values(mainProps.phones).filter(phone => phone.id == values.phone).map(phone => phone.number)[0] });
        // API call to submit the final data
        dispatch(addNewSurvey(values));
        dispatch(getSurveys());
    };

    const addPrompt = (push) => {
        push({ prompt: "" });
    };

    const removePrompt = (remove, index) => {
        if (index > 0) {
            remove(index);
            setTextareaCounts(prevCounts => ({
                ...prevCounts,
                [index]: 0
            }));
        }
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
                                    <Label for="name">Survey Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter your survey name"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        value={formikProps.values.name}
                                    />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </FormGroup>
                            </Col>
                            <Col lg="4">
                                <FormGroup>
                                    <Label for="start_code">Start Code</Label>
                                    <Input
                                        id="start_code"
                                        name="start_code"
                                        type="text"
                                        placeholder="Enter your survey start code"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        value={formikProps.values.start_code}
                                    />
                                    <ErrorMessage name="start_code" component="div" className="text-danger" />
                                </FormGroup>
                            </Col>
                            <Col lg="4">
                                <FormGroup>
                                    <Label for="phone">Phone</Label>
                                    <select
                                        name="phone"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        value={formikProps.values.phone}
                                        placeholder=""
                                        className="form-control"
                                    >
                                        <option value="">Select Phone</option>

                                        {dynamicOptions.map(option => (
                                            <option key={option.id} value={option.id}>
                                                {option.label}  {option.number}
                                            </option>
                                        ))}
                                    </select>

                                    {/* 
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        placeholder="Enter your survey phone number"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        value={formikProps.values.phone}
                                    /> */}
                                    <ErrorMessage name="phone" component="div" className="text-danger" />
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
                        <div className="row justify-content-center">
                            <Col lg="6">
                                <div className="text-center">
                                    <div className="mb-4">
                                        <i className="mdi mdi-check-circle-outline text-success display-4" />
                                    </div>
                                    <h5>Confirm Detail</h5>
                                    <p className="text-muted">Your survey should be ready to go after you save it!</p>
                                    <Button color="primary" type="submit">Submit Survey</Button>
                                </div>
                            </Col>
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
                                        className={
                                            classnames({
                                                'btn': true,
                                                'btn-primary': true,
                                                'disabled': !canProceed
                                            })}
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
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                            <img src={API_URL + `/api/generate_qr_code?phone_number=${shareData.phone_number}&start_code=${shareData.start_code}`} alt="QR Code" />
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
                                                            <span className="number">1.</span> Survey
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
                                                            <span className="number">3.</span> Confirm Details
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem
                                                        className={classnames({ current: activeTab === 4 })}>
                                                        <NavLink
                                                            className={classnames({ active: activeTab === 4 })}
                                                            onClick={() => { setActiveTab(4); }}
                                                        >
                                                            <span className="number">4.</span> Share
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
        error,
        success
    } = state.surveys;

    return { surveys, phones, surveyDetail, error, success };
};

export default connect(mapStatetoProps, {
    // getSurveys,
    // getSurveyDetail,
    // addNewSurvey,
})(withTranslation()(FormWizard));