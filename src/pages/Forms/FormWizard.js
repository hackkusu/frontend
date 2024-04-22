import React, { useState } from "react"

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  CardTitle
} from "reactstrap"

import classnames from "classnames"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const FormWizard = () => {

  document.title = " Form Wizard | HackUSU - Responsive Bootstrap 5 Admin Dashboard"

  const [activeTab, setactiveTab] = useState(1)
  const [activeTabVartical, setoggleTabVertical] = useState(1)

  const [rows1, setrows1] = useState([{ id: 1 }]);

  function handleAddRowNested() {
    const modifiedRows = [...rows1];
    modifiedRows.push({ id: modifiedRows.length + 1 });
    setrows1(modifiedRows);
  }

  function handleRemoveRow(id) {
    if (id !== 1) {
      var modifiedRows = [...rows1];
      modifiedRows = modifiedRows.filter(x => x["id"] !== id);
      setrows1(modifiedRows);
    }
  }

  const [formRows, setFormRows] = useState([{ id: 1 }]);

  const onAddFormRow = () => {
    const modifiedRows = [...formRows];
    modifiedRows.push({ id: modifiedRows.length + 1 });
    setFormRows(modifiedRows);
  };

  const onDeleteFormRow = id => {
    if (id !== 1) {
      var modifiedRows = [...formRows];
      modifiedRows = modifiedRows.filter(x => x["id"] !== id);
      setFormRows(modifiedRows);
    }
  };

  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab)
      }
    }
  }

  function toggleTabVertical(tab) {
    if (activeTabVartical !== tab) {
      if (tab >= 1 && tab <= 4) {
        setoggleTabVertical(tab)
      }
    }
  }

  return (
    <React.Fragment>

      <Row>

        <Col lg="12">
          <Card>
            <CardBody>
              <h4 className="card-title mb-4">Survey Wizard</h4>
              <div className="vertical-wizard wizard clearfix vertical">
                <div className="steps clearfix">
                  <ul>
                    <NavItem
                      className={classnames({
                        current: activeTabVartical === 1,
                      })}>
                      <NavLink
                        className={classnames({
                          active: activeTabVartical === 1,
                        })}
                        onClick={() => {
                          toggleTabVertical(1)
                        }}
                      >
                        <span className="number">1.</span>{" "}
                        Survey Details
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className={classnames({
                        current: activeTabVartical === 2,
                      })}>
                      <NavLink
                        className={classnames({
                          active: activeTabVartical === 2,
                        })}
                        onClick={() => {
                          toggleTabVertical(2)
                        }}
                      >
                        <span className="number">2.</span>{" "}
                        <span>Prompts</span>
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className={classnames({
                        current: activeTabVartical === 3,
                      })}>
                      <NavLink
                        className={classnames({
                          active: activeTabVartical === 3,
                          'done': true,
                        })}
                        onClick={() => {
                          toggleTabVertical(3)
                        }}
                      >
                        <span className="number">3.</span>{" "}
                        Share
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className={classnames({
                        current: activeTabVartical === 4,
                      })}>
                      <NavLink
                        className={classnames({
                          active: activeTabVartical === 4,
                          'done': true,
                        })}
                        onClick={() => {
                          toggleTabVertical(4)
                        }}
                      >
                        <span className="number">4.</span>{" "}
                        Confirm Detail
                      </NavLink>
                    </NavItem>
                  </ul>
                </div>



                <div className="content clearfix">
                  <TabContent
                    activeTab={activeTabVartical}
                    className="body"
                  >
                    <TabPane tabId={1}>

                      <div>
                        <Form>
                          <Row>
                            <Col lg="4">
                              <FormGroup className="mb-3">
                                <Label htmlFor="basicpill-pancard-input5">
                                  Name
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-pancard-input5"
                                  placeholder="Enter your survey name"
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="4">
                              <FormGroup className="mb-3">
                                <Label htmlFor="basicpill-pancard-input5">
                                  Start Code
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-pancard-input5"
                                  placeholder="Enter your survey start code"
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="4">
                              <FormGroup className="mb-3">
                                <Label htmlFor="basicpill-cstno-input7">
                                  Phone
                                </Label>
                                {/* <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-cstno-input7"
                                  placeholder="Enter your survey phone"
                                /> */}
                                <select
                                  name="phone_id"
                                  // onChange={validation.handleChange}
                                  // onBlur={validation.handleBlur}
                                  // value={validation.values.phone_id}
                                  className="form-control"
                                >
                                  <option value="">Select Phone</option>
                                  <option value="+14352131896">14352131896</option>
                                  {/* {dynamicOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))} */}
                                </select>
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg="12">
                              <FormGroup className="mb-3">
                                <Label htmlFor="basicpill-vatno-input6">
                                  Description
                                </Label>
                                <Input
                                  type="textarea"
                                  className="form-control"
                                  id="basicpill-vatno-input6"
                                  placeholder="Enter your survey description"
                                />
                              </FormGroup>
                            </Col>
                          </Row>


                        </Form>
                      </div>



                    </TabPane>

                    <TabPane tabId={2}>
                      <Row>
                        <Col xs={12}>
                          {/* <Card>
                                <CardBody> */}
                          {/* <CardTitle className="mb-4">Example</CardTitle> */}
                          <Form className="repeater" encType="multipart/form-data">
                            <div>
                              {(formRows || []).map((formRow, key) => (
                                <Row key={key}>
                                  {/* <Col lg={2} className="mb-3">
                                            <label htmlFor="name">Name {formRow.id}</label>
                                            <input
                                              type="text"
                                              id="name"
                                              name="untyped-input"
                                              className="form-control"
                                              placeholder="Enter your full name"
                                            />
                                          </Col> */}

                                  <Col lg={10} className="mb-3">
                                    <Label className="form-label">Enter prompt(s)</Label>
                                    <Input
                                      name="textarea"
                                      placeholder=""
                                      type="textarea"
                                      rows="5"
                                    // onChange={validationType.handleChange}
                                    // onBlur={validationType.handleBlur}
                                    // value={validationType.values.textarea || ""}
                                    // invalid={
                                    //   validationType.touched.textarea && validationType.errors.textarea ? true : false
                                    // }
                                    />
                                    {/* {validationType.touched.textarea && validationType.errors.textarea ? (
                                              <FormFeedback type="invalid">{validationType.errors.textarea}</FormFeedback>
                                            ) : null} */}
                                  </Col>

                                  {/* <Col lg={2} className="mb-3">
                                            <label htmlFor="email">Email</label>
                                            <input
                                              type="email"
                                              id="email"
                                              className="form-control"
                                              placeholder="Enter your email address"
                                            />
                                          </Col>

                                          <Col lg={2} className="mb-3">
                                            <label htmlFor="subject">Subject</label>
                                            <input
                                              type="text"
                                              id="subject"
                                              className="form-control"
                                              placeholder="Enter your subject"
                                            />
                                          </Col>

                                          <Col lg={2} className="mb-3">
                                            <label htmlFor="resume">Resume</label>
                                            <input
                                              type="file"
                                              className="form-control"
                                              id="resume"
                                            />
                                          </Col>

                                          <Col lg={2} className="mb-3">
                                            <label htmlFor="message">Message</label>
                                            <textarea
                                              id="message"
                                              className="form-control"
                                              placeholder="Enter your message"
                                            ></textarea>
                                          </Col> */}

                                  <Col lg={2} className="align-self-center">
                                    <div className="d-grid">
                                      <input
                                        type="button"
                                        className="btn btn-primary"
                                        value="Delete"
                                        onClick={() => onDeleteFormRow(formRow.id)}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              ))}
                            </div>
                            <input
                              type="button"
                              className="btn btn-success mt-3 mt-lg-0"
                              value="Add"
                              onClick={() => onAddFormRow()}
                            />
                          </Form>
                          {/* </CardBody>
                              </Card> */}
                        </Col>
                      </Row>
                    </TabPane>

                    <TabPane tabId={3}>
                      <div>
                        <Form>
                          <Row>
                            <Col lg="12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                                <img src="http://localhost:8000/api/generate_qr_code?phone_number=4352131896&start_code=hello" />
                            </Col>
                          </Row>

                        </Form>
                      </div>
                    </TabPane>
                    <TabPane tabId={4}>
                      <div className="row justify-content-center">
                        <Col lg="6">
                          <div className="text-center">
                            <div className="mb-4">
                              <i className="mdi mdi-check-circle-outline text-success display-4" />
                            </div>
                            <div>
                              <h5>Confirm Detail</h5>
                              <p className="text-muted">
                                Your survey should be ready to go!
                              </p>
                            </div>
                          </div>
                        </Col>
                      </div>
                    </TabPane>
                  </TabContent>
                </div>

                <div className="actions clearfix">
                  <ul>
                    <li
                      className={
                        activeTabVartical === 1
                          ? "previous disabled"
                          : "previous"
                      }
                    >
                      <Link
                        to="#"
                        onClick={() => {
                          toggleTabVertical(activeTabVartical - 1)
                        }}
                      >
                        Previous
                      </Link>
                    </li>
                    <li
                      className={
                        activeTabVartical === 4
                          ? "next disabled"
                          : "next"
                      }
                    >
                      <Link
                        to="#"
                        onClick={() => {
                          toggleTabVertical(activeTabVartical + 1)
                        }}
                      >
                        Next
                      </Link>
                    </li>
                  </ul>
                </div>

                
              </div>
            </CardBody>
          </Card>
        </Col>

      </Row>

    </React.Fragment>
  )
}

export default FormWizard
