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
  DELETE_SURVEY_FAIL
} from "./actionTypes"

const INIT_STATE = {
  surveys: [],
  surveyDetail: {},
  phones: [],
  error: {},
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
