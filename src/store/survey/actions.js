import {
  GET_SURVEYS,
  GET_SURVEYS_FAIL,
  GET_SURVEYS_SUCCESS,
  GET_SURVEY_QUESTIONS,
  GET_SURVEY_QUESTIONS_SUCCESS,
  GET_SURVEY_QUESTIONS_FAIL,
  SET_ACTIVE_SURVEY,
  SET_ACTIVE_SURVEY_QUESTION,
  GET_PHONES,
  GET_PHONES_SUCCESS,
  GET_PHONES_FAIL,
  GET_SURVEY_DETAIL,
  GET_SURVEY_DETAIL_FAIL,
  GET_SURVEY_DETAIL_SUCCESS,
  ADD_NEW_SURVEY,
  ADD_SURVEY_SUCCESS,
  ADD_SURVEY_FAIL,
  UPDATE_SURVEY,
  UPDATE_SURVEY_SUCCESS,
  UPDATE_SURVEY_FAIL,
  DELETE_SURVEY,
  DELETE_SURVEY_SUCCESS,
  DELETE_SURVEY_FAIL,
} from "./actionTypes"

export const getSurveys = () => ({
  type: GET_SURVEYS,
})

export const getSurveysSuccess = surveys => ({
  type: GET_SURVEYS_SUCCESS,
  payload: surveys,
})

export const getSurveysFail = error => ({
  type: GET_SURVEYS_FAIL,
  payload: error,
})

export const getPhones = () => ({
  type: GET_PHONES,
})

export const getPhonesSuccess = phones => ({
  type: GET_PHONES_SUCCESS,
  payload: phones,
})

export const getPhonesFail = error => ({
  type: GET_PHONES_FAIL,
  payload: error,
})

export const addNewSurvey = survey => ({
  type: ADD_NEW_SURVEY,
  payload: survey,
})

export const addSurveySuccess = survey => ({
  type: ADD_SURVEY_SUCCESS,
  payload: survey,
})  

export const addSurveyFail = error => ({
  type: ADD_SURVEY_FAIL,
  payload: error,
})

export const updateSurvey = survey => ({
  type: UPDATE_SURVEY,
  payload: survey,
})

export const updateSurveySuccess = survey => ({
  type: UPDATE_SURVEY_SUCCESS,
  payload: survey,
})

export const updateSurveyFail = error => ({
  type: UPDATE_SURVEY_FAIL,
  payload: error,
})

export const deleteSurvey = survey => ({
  type: DELETE_SURVEY,
  payload: survey,
})

export const deleteSurveySuccess = survey => ({
  type: DELETE_SURVEY_SUCCESS,
  payload: survey,
})

export const deleteSurveyFail = error => ({
  type: DELETE_SURVEY_FAIL,
  payload: error,
})

export const getSurveyDetail = surveyId => ({
  type: GET_SURVEY_DETAIL,
  surveyId,
})

export const getSurveyDetailSuccess = surveys => ({
  type: GET_SURVEY_DETAIL_SUCCESS,
  payload: surveys,
})

export const getSurveyDetailFail = error => ({
  type: GET_SURVEY_DETAIL_FAIL,
  payload: error,
})

export const getSurveyQuestions = surveyId => ({
  type: GET_SURVEY_QUESTIONS,
  surveyId,
})

export const getSurveyQuestionsSuccess = questions => ({
  type: GET_SURVEY_QUESTIONS_SUCCESS,
  payload: questions,
})

export const getSurveyQuestionsFail = error => ({
  type: GET_SURVEY_QUESTIONS_FAIL,
  payload: error,
})

export const setActiveSurvey = surveyId => ({
  type: SET_ACTIVE_SURVEY,
  payload: surveyId,
})

export const setActiveSurveyQuestion = questionId => ({
  type: SET_ACTIVE_SURVEY_QUESTION,
  payload: questionId,
})
