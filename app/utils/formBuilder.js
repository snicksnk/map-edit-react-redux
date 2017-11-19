import React, { Component } from 'react';
import autobind from 'autobind-decorator';

export function FormErrors(errors) {
  this.name = 'FormErrors';
  this.message = 'Form Error';
  this.errors = errors;
}

FormErrors.prototype = Error.prototype;

export default class FormBuilder extends Component {

  constructor(props) {
    super(props);
    const { formValues, defautlFormValues, externalErrors, externalMessages } = props;
    this.defautlFormValues = props.defautlFormValues;

    const currentValues = (Object.keys(formValues).length > 0) ? formValues : defautlFormValues;

    this.state = {
      formValues: currentValues,
      formErrors: { ...externalErrors },
      formMessages: externalMessages,
    };
  }

  componentWillReceiveProps(newProps) {
    const { externalErrors, externalMessages, formValues } = newProps;
    this.setState({
      formErrors: { ...externalErrors },
      formMessages: externalMessages,
    });
    if (Object.keys(formValues).length > 0) {
      this.setFormValues(formValues);
    }
  }

  @autobind
  setFormValue(name, value) {
    const { onTypeValidator } = this.props;
    const formValues = { ...this.state.formValues, ...{ [name]: value } };
    const formErrors = onTypeValidator(formValues) || {};
    this.setState({ formValues, formErrors });
  }

  @autobind
  setInputValue(e) {
    this.setFormValue(e.target.name, e.target.value);
  }

  setFormValues(formValues) {
    this.setState({ formValues });
  }

  @autobind
  processSubmit(e) {
    const { submit, onSubmitValidator } = this.props;
    const { formValues } = this.state;
    if (typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    const formErrors = onSubmitValidator(formValues) || {};
    console.log('processSubmit-errors', formErrors);
    this.setState({ formErrors });

    if (Object.keys(formErrors).length === 0) {
      submit(formValues);
    }
  }

  render() {
    const { FormComponent, formComponentProps } = this.props;
    const { setFormValue, setInputValue } = this;
    const { formErrors, formValues, formMessages } = this.state;


    console.log('formBuilder-render', formErrors);

    return (
      <div>
        <FormComponent
          {...formComponentProps}
          setFormValue={setFormValue}
          setInputValue={setInputValue}
          errors={formErrors}
          messages={formMessages}
          values={formValues}
          submit={this.processSubmit}
        />
      </div>
    );
  }
}

FormBuilder.propTypes = {
  FormComponent: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.func
  ]).isRequired,
  formComponentProps: React.PropTypes.object,
  defautlFormValues: React.PropTypes.object,
  // TODO This row is really requred?
  formValues: React.PropTypes.object,
  onTypeValidator: React.PropTypes.func,
  externalErrors: React.PropTypes.object,
  externalMessages: React.PropTypes.object,
  submit: React.PropTypes.func.isRequired
};


FormBuilder.defaultProps = {
  defautlFormValues: {},
  formComponentProps: {},
  onTypeValidator: () => null,
  onSubmitValidator: () => null,
  externalErrors: {},
  externalMessages: {},
  formValues: {}
};
