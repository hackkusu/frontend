import axios from "axios";
import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";



// get surveys
export const getSurveys = () => get('/api/v1/surveys/');

// get phones
export const getPhones = () => get('/api/v1/phones/');

// add surveys
export const addNewSurvey = (survey) =>
post('/api/v1/surveys/', survey);

//update surveys
export const updateSurvey = (survey) => put(`/api/v1/surveys/${survey.id}/`, survey);

//delete survey
export const deleteSurvey = (survey) =>
del(`/api/v1/surveys/${survey.id}/`, {headers: {survey}})

// get survey details
export const getSurveyDetail = (id) =>
  get(`/api/v1/surveys/${id}/`);


export {

};
