import React from 'react';
import { Col } from 'reactstrap';
import { useFormik } from 'formik';

const MainSelectForm = () => {
    // This would be your Formik hook initialization
    const validation = useFormik({
        initialValues: {
            phone_id: '', // make sure this matches one of the option values if default is selected
        },
        onSubmit: values => {
            console.log(values);
        },
        // Define the rest of your formik setup here...
    });

    // This would be your dynamic options fetched from an API or defined in your component
    const dynamicOptions = [
        { value: '1', label: 'Large select' },
        { value: '2', label: 'Small select' },
        // ... other options
    ];

    return (
        <React.Fragment>
            <Col xl={6}></Col>
            <Col xl={3}>
                <div className="mb-3">
                    <select
                        name="phone_id"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.phone_id}
                        className="form-control"
                    >
                        <option value="">Select Survey</option>
                        {dynamicOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </Col>
            <Col xl={3}>
                <div className="mb-3">
                    <select
                        name="phone_id"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.phone_id}
                        className="form-control"
                    >
                        <option value="">Select Survey</option>
                        {dynamicOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </Col>
        </React.Fragment>
    );
};

export default MainSelectForm;
