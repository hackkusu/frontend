import {
  GET_SURVEYS_FAIL,
  GET_SURVEYS_SUCCESS,
  GET_PHONES_FAIL,
  GET_PHONES_SUCCESS,
  GET_SURVEY_DETAIL_SUCCESS,
  GET_SURVEY_DETAIL_FAIL,
  ADD_SURVEY_SUCCESS,
  ADD_SURVEY_FAIL,
  UPDATE_SURVEY_SUCCESS,
  UPDATE_SURVEY_FAIL,
  DELETE_SURVEY_SUCCESS,
  DELETE_SURVEY_FAIL,
  GET_SURVEY_QUESTIONS_SUCCESS,
  GET_SURVEY_QUESTIONS_FAIL,
  SET_ACTIVE_SURVEY,
  SET_ACTIVE_SURVEY_QUESTION,
} from "./actionTypes"

const INIT_STATE = {
  surveys: [],
  surveyDetail: {},
  phones: [],
  error: {},
  surveyQuestions: [],
  activeSurvey: null,
  activeSurveyQuestion: null
}

const Surveys = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SURVEYS_SUCCESS:
      return {
        ...state,
        surveys: action.payload,
      }

    case GET_SURVEYS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_SURVEY_QUESTIONS_SUCCESS:
      return {
        ...state,
        surveyQuestions: action.payload,
      }

    case GET_SURVEY_QUESTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case SET_ACTIVE_SURVEY:
      return {
        ...state,
        activeSurvey: action.payload,
      }

    case SET_ACTIVE_SURVEY_QUESTION:
      return {
        ...state,
        activeSurveyQuestion: action.payload,
      }

    case GET_PHONES_SUCCESS:
      return {
        ...state,
        phones: action.payload,
      }

    case GET_PHONES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_SURVEY_SUCCESS:
      return {
        ...state,
        surveys: [...state.surveys, action.payload],
        success: action.payload
      }

    case ADD_SURVEY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_SURVEY_SUCCESS:
      return {
        ...state,
        surveys: state.surveys.map(survey =>
          survey.id.toString() === action.payload.id.toString()
            ? { survey, ...action.payload }
            : survey
        ),
      }

    case UPDATE_SURVEY_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_SURVEY_SUCCESS:
      return {
        ...state,
        surveys: state.surveys.filter(
          survey => survey.id.toString() !== action.payload.toString()
        ),
      }

    case DELETE_SURVEY_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case GET_SURVEY_DETAIL_SUCCESS:
      return {
        ...state,
        surveyDetail: action.payload,
      }

    case GET_SURVEY_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default Surveys
