import PropTypes from 'prop-types'
import React, { useEffect } from "react"

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label, Modal } from "reactstrap";


import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { getSurveyDetail, addNewSurvey, getSurveys, updateSurvey, getPhones } from "../../store/actions"

import { withTranslation } from "react-i18next";
import { connect } from "react-redux";


const SurveyModal = (props) => {

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: props.surveyDetail || {
      name: '',
      start_code: '',
      phone_id: null,
      description: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Survey name is required"),
      phone_id: Yup.string().required("Survey phone is required"),
      start_code: Yup.string().required("Survey start code is required"),
    }),
    onSubmit: (values) => {
      debugger;
      // dispatch(addNewSurvey(values));

      dispatch(updateSurvey(values));
      // dispatch(getSurveyDetail(2));
    }
  });

  useEffect(() => {
    dispatch(getPhones());
    dispatch(getSurveyDetail(2));
  }, []);


  return (
    <Modal
      isOpen={props.open}
      toggle={() => {
        props.closeModal();
      }}
    >
      <Form
        className="form-horizontal"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
      >
        <div className="modal-header">
          <h5
            className="modal-title"
            id="exampleModalLabel"
          >
            {/* New survey */}
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              // setmodal_mdotoggle(false);
              props.closeModal()
            }}
          ></button>
        </div>
        <div className="modal-body">
          {/* <SurveyModal /> */}
          {/* <form> */}

          <div className="mb-3">
            <Label className="form-label">Survey Name</Label>
            <Input
              name="name"
              className="form-control"
              placeholder="Enter survey name"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.name || ""}
              invalid={
                validation.touched.name && validation.errors.name ? true : false
              }
            />
            {validation.touched.name && validation.errors.name ? (
              <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
            ) : null}
          </div>

          <div className="mb-3">
            <Label className="form-label">Survey Start Code</Label>
            <Input
              name="start_code"
              className="form-control"
              placeholder="Enter survey start code"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.start_code || ""}
              invalid={
                validation.touched.start_code && validation.errors.start_code ? true : false
              }
            />
            {validation.touched.start_code && validation.errors.start_code ? (
              <FormFeedback type="invalid">{validation.errors.start_code}</FormFeedback>
            ) : null}
          </div>

          {/* <div className="mb-3">
            <label className="col-md-2 col-form-label">Select</label>
            <div className="col-md-10">
              <select onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.phone_id || ""}
                className="form-control">
                <option>Select</option>
                <option>Large select</option>
                <option>Small select</option>
              </select>
            </div>
          </div> */}


          <div className="mb-3">
            <label
              htmlFor="message-text"
              className="col-form-label"
            >
              Description
            </label>
            <textarea
              name='description'
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.description}
              className="form-control"
              id="message-text"
            ></textarea>
          </div>
          {/* </form> */}


        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              props.closeModal();
            }}
          >
            Close
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>

      </Form>
    </Modal>

  )
}


SurveyModal.propTypes = {
  open: PropTypes.any,
  closeModal: PropTypes.any
}

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
})(withTranslation()(SurveyModal));