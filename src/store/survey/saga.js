import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { 
  GET_SURVEYS,
  GET_SURVEY_DETAIL,
  GET_SURVEY_QUESTIONS,
  ADD_NEW_SURVEY,
  UPDATE_SURVEY,
  DELETE_SURVEY,
  GET_PHONES
 } from "./actionTypes"
 
import {
  getSurveysSuccess,
  getSurveysFail,
  getPhonesSuccess,
  getPhonesFail,
  getSurveyDetailSuccess,
  getSurveyDetailFail,
  addSurveySuccess,
  addSurveyFail,
  updateSurveySuccess,
  updateSurveyFail,
  deleteSurveySuccess,
  deleteSurveyFail,
  getSurveyQuestionsSuccess,
  getSurveyQuestionsFail
} from "./actions"

//Include Both Helper File with needed methods
import { 
  getSurveys,
  getPhones,
  getSurveyDetail,
  addNewSurvey,
  updateSurvey,
  deleteSurvey,
  getSurveyQuestions
 } from "../../helpers/backend_helper"

function* fetchSurveys() {
  try {
    const response = yield call(getSurveys)
    yield put(getSurveysSuccess(response))
  } catch (error) {
    yield put(getSurveysFail(error))
  }
}

function* fetchPhones() {
  try {
    const response = yield call(getPhones)
    yield put(getPhonesSuccess(response))
  } catch (error) {
    yield put(getPhonesFail(error))
  }
}

function* onUpdateSurvey ({payload: survey }) {
  try {
    const response = yield call(updateSurvey, survey);
    yield put(updateSurveySuccess(response));
  } catch (error) {
    yield put(updateSurveyFail(error));
  }
}

function* onDeleteSurvey ({payload: survey}) {
  try {
    const response = yield call(deleteSurvey, survey);
    yield put(deleteSurveySuccess(response));
  } catch (error) {
    yield put(deleteSurveyFail(error));
  }
}

function* onAddNewSurvey ({ payload: survey}) {
  try {
    const response = yield call(addNewSurvey, survey);
    yield put(addSurveySuccess(response));
  } catch (error) {
    yield put(addSurveyFail(error));
  }
}

function* fetchSurveyDetail({ surveyId }) {
  try {
    const response = yield call(getSurveyDetail, surveyId)
    yield put(getSurveyDetailSuccess(response))
  } catch (error) {
    yield put(getSurveyDetailFail(error))
  }
}

function* fetchSurveyQuestions({ surveyId }) {
  try {
    const response = yield call(getSurveyQuestions, surveyId)
    yield put(getSurveyQuestionsSuccess(response))
  } catch (error) {
    yield put(getSurveyQuestionsFail(error))
  }
}

function* surveySaga() {
  yield takeEvery(GET_SURVEYS, fetchSurveys)
  yield takeEvery(GET_PHONES, fetchPhones)
  yield takeEvery(GET_SURVEY_DETAIL, fetchSurveyDetail)
  yield takeEvery(GET_SURVEY_QUESTIONS, fetchSurveyQuestions)
  yield takeEvery(ADD_NEW_SURVEY, onAddNewSurvey);
  yield takeEvery(UPDATE_SURVEY, onUpdateSurvey);
  yield takeEvery(DELETE_SURVEY, onDeleteSurvey);
}

export default surveySaga
