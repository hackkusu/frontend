import React, {useState} from 'react';
import { Col } from 'reactstrap';
import { useFormik } from 'formik';

// actions
import { getSurveyDetail, addNewSurvey, getSurveys, updateSurvey, getPhones, setActiveSurvey, setActiveSurveyQuestion } from "../../store/actions"

import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { API_URL } from '../../helpers/api_helper';
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useEffect } from 'react';


const MainSelectForm = (mainProps) => {
    const [surveyOptions, setSurveyOptions] = useState(Object.values(mainProps.surveys))
    const dispatch = useDispatch();
    // This would be your Formik hook initialization
    const validation = useFormik({
        initialValues: {
            survey_id: '',
            question_id: ''
        },
        onSubmit: values => {
            console.log(values);
        },
        // Define the rest of your formik setup here...
    });

    useEffect(() => {
        dispatch(getSurveys());

        console.log(mainProps);
    }, []);

    useEffect(() => {
        console.log('activeSurvey', mainProps.activeSurvey);
    }, [mainProps.activeSurvey]);

    useEffect(() => {
        setSurveyOptions(mainProps.surveys)
    }, [mainProps.surveys])


    // This would be your dynamic options fetched from an API or defined in your component
    // const dynamicOptions = Object.values(mainProps.surveys);

    return (
        <React.Fragment>
            <Col xl={6}></Col>
            <Col xl={3}>
                <div className="mb-3">
                    <select
                        name="survey_id"
                        onChange={(props) => {
                            dispatch(setActiveSurvey(mainProps.surveys.filter((survey) => survey.id == props.target.value)[0]));
                            validation.handleChange(props);
                        }}
                        onBlur={validation.handleBlur}
                        value={validation.values.phone_id}
                        className="form-control"
                    >
                        <option value="">Select Survey</option>
                        {surveyOptions.map((option, idx) => (
                            <option key={idx} value={option?.id}>
                                {option?.name} - {option?.start_code}
                            </option>
                        ))}
                    </select>
                </div>
            </Col>
            {/* <Col xl={3}>
                <div className="mb-3">
                    <select
                        name="question_id"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.phone_id}
                        className="form-control"
                    >
                        <option value="">Select Survey</option>
                        {dynamicOptions.map(option => (
                            <option key={option.id.toString()} value={option.id.toString()}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
            </Col> */}
        </React.Fragment>
    );
};


const mapStatetoProps = state => {

    const {
        surveys,
        surveyDetail,
        phones,
        error,
        activeSurvey,
        activeSurveyQuestion
    } = state.surveys;

    return { surveys, phones, surveyDetail, error, activeSurvey, activeSurveyQuestion };
};

export default connect(mapStatetoProps, {
    // getSurveys,
    // getSurveyDetail,
    // addNewSurvey,
})(withTranslation()(MainSelectForm));