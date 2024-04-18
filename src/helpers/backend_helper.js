import axios from "axios";
import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";



// get surveys
export const getSurveys = () => get('http://localhost:8000/api/v1/survey/');

// add surveys
export const addNewSurvey = (survey) =>
post('http://localhost:8000/api/v1/survey/', survey);

//update surveys
export const updateSurvey = (survey) => put(`http://localhost:8000/api/v1/survey/${survey.id}/`, survey);

//delete survey
export const deleteSurvey = (survey) =>
del(`http://localhost:8000/api/v1/survey/${survey.id}/`, {headers: {survey}})

// get survey details
export const getSurveyDetail = (id) =>
  get(`http://localhost:8000/api/v1/survey/${id}/`);


export {

};
