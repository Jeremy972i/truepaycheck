import './formik-demo.css';
import React from 'react';
import { render } from 'react-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { MoreResources, DisplayFormikState } from './formik-demo';


const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    EmployerName: Yup.string()
      .min(2, "Are you sure en entered correct info?")
      .required('Employer Name is required.'),
    Location: Yup.string()
      .min(2, "Are you sure en entered correct info?")
      .required('Location is required.'),
    JobTitle: Yup.string()
      .min(2, 'Are you sure en entered correct info?')
      .required('Job Title is required!'),
    YearsofXP: Yup.string()
      .required('Years of Experience is required!'),
  }),

  mapPropsToValues: ({ user }) => ({
    ...user,
  }),
  handleSubmit: (payload, { setSubmitting }) => {
    alert(payload.email);
    setSubmitting(false);
  },
  displayName: 'MyForm',
});

const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null;

const Label = ({ error, className, children, ...props }) => {
  return (
    <label className="label" {...props}>
      {children}
    </label>
  );
};

const TextInput = ({ type, id, label, error, value, onChange, className, ...props }) => {
  const classes = classnames(
    'input-group',
    {
      'animated shake error': !!error,
    },
    className
  );
  return (
    <div className={classes}>
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
      <input
        id={id}
        className="text-input"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} />
    </div>
  );
};
const MyForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        id="EmployerName"
        type="text"
        label="Employer Name"
        placeholder="My Employer"
        error={touched.EmployerName && errors.EmployerName}
        value={values.EmployerName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="Location"
        type="text"
        label="Location"
        placeholder="My City"
        error={touched.Location && errors.Location}
        value={values.Location}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="JobTitle"
        type="text"
        label="Job Title"
        placeholder="My Job"
        error={touched.JobTitle && errors.JobTitle}
        value={values.JobTitle}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="YearsofXP"
        type="number"
        label="Years of Experience"
        placeholder="My Years of Experience"
        error={touched.YearsofXP && errors.YearsofXP}
        value={values.YearsofXP}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
      <DisplayFormikState {...props} />
    </form>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

// Helper for the demo

const App = () => (
  <div className="app">
    
    <h1>True Pay Check</h1>
    <p>
      True Pay Check enables you to evaluate if you are well paid or not. Enter your information below and get your evaluation.
    </p>

    <MyEnhancedForm user={{ email: '', firstName: '', lastName: '' }} />
    {/*<MoreResources />*/}
  </div>
);

render(<App />, document.getElementById('root'));
