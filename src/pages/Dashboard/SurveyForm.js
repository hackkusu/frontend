import React, { useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Button,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

const SurveyWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [survey, setSurvey] = useState({
    name: "",
    description: "",
    start_code: "",
    phone: "", // You would need to handle phone selection differently
  });
  const [questions, setQuestions] = useState([]);

  // Validation schema for the survey
  const surveyValidationSchema = Yup.object().shape({
    name: Yup.string().required("Survey name is required"),
    description: Yup.string().required("Survey description is required"),
    // ... more validations
  });

  // Validation schema for survey questions
  const questionValidationSchema = Yup.object().shape({
    question: Yup.string().required("Question text is required"),
    sort_order: Yup.number().required("Sort order is required"),
    // ... more validations
  });

  // Formik for survey form
  const surveyFormik = useFormik({
    initialValues: survey,
    validationSchema: surveyValidationSchema,
    onSubmit: (values) => {
      console.log("Survey Values:", values);
      // Proceed to questions step
      setCurrentStep(2);
    },
  });

  // Formik for questions form
  const questionFormik = useFormik({
    initialValues: { question: "", sort_order: questions.length },
    validationSchema: questionValidationSchema,
    onSubmit: (values) => {
      console.log("Question Values:", values);
      // Add question to the questions array
      setQuestions([...questions, values]);
      // Reset the form for the next question
      questionFormik.resetForm();
    },
  });

  // Function to move to the next step
  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Function to submit all data
  const submitAll = () => {
    // Here you would combine the survey and questions data
    // and make an API call to submit everything
    console.log("Final Survey Data", survey);
    console.log("Final Questions", questions);
    // Call API endpoints here
  };

  // Conditional rendering based on the step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Form onSubmit={surveyFormik.handleSubmit}>
            <FormGroup>
              <Input
                name="name"
                placeholder="Survey Name"
                onChange={surveyFormik.handleChange}
                value={surveyFormik.values.name}
              />
            </FormGroup>
            {/* ... other survey fields ... */}
            <Button type="submit">Next</Button>
          </Form>
        );
      case 2:
        return (
          <Form onSubmit={questionFormik.handleSubmit}>
            <FormGroup>
              <Input
                name="question"
                placeholder="Survey Question"
                onChange={questionFormik.handleChange}
                value={questionFormik.values.question}
              />
            </FormGroup>
            {/* ... other question fields ... */}
            <Button type="submit">Add Question</Button>
          </Form>
        );
      case 3:
        return (
          <>
            <p>Review your survey and questions:</p>
            <div>
              <strong>Survey Name:</strong> {survey.name}
              {/* ... display other survey data ... */}
            </div>
            <div>
              {questions.map((q, idx) => (
                <p key={idx}>{q.question}</p>
                // Display question data
              ))}
            </div>
            <Button onClick={submitAll}>Submit Survey</Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Card>
        <CardBody>
          <CardTitle>Survey Wizard</CardTitle>
          {renderStep()}
        </CardBody>
      </Card>
    </Container>
  );
};

export default SurveyWizard;
