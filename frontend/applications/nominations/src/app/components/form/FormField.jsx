import * as React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import { Field } from 'react-final-form';
import { isNil } from 'rambda';

const requiredValidator = value => (!isNil(value) ? undefined : 'Required');

const getValidationState = ({ error, touched }) => {
  if (error && touched) {
    return 'error';
  }
  if (touched) {
    return 'success';
  }

  return null;
};

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export default class FormField extends React.PureComponent {
  render() {
    const {
      name,
      label,
      parse,
      format,
      controlId,
      required = false,
      validators = required ? [requiredValidator] : [],
      children,
      ...otherProps
    } = this.props;

    return (
      <Field name={name} parse={parse} format={format} validate={composeValidators(...validators)}>
        {({ input, meta }) => (
          <FormGroup controlId={controlId} validationState={getValidationState(meta)}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...input} {...otherProps}>
              {children}
            </FormControl>
            {meta.error && meta.touched && <HelpBlock>{meta.error}</HelpBlock>}
          </FormGroup>
        )}
      </Field>
    );
  }
}
