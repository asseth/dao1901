import React, {Component} from 'react';
import classNames from 'classnames';
import {FormGroup, FormFeedback, Input} from 'reactstrap';

export default class RenderInput extends Component {
  /*static propTypes = {
   input: React.PropTypes.object,
   placeholder: React.PropTypes.string,
   type: React.PropTypes.string.isRequired,
   meta: React.PropTypes.shape({
   touched: React.PropTypes.bool,
   error: React.PropTypes.any,
   }),
   };*/

  render() {
    const {
            input,
            placeholder,
            type,
            meta: {
              touched,
              error,
            },
          } = this.props;

    const classes = classNames({
      success: touched && !error,
      danger: touched && error,
    });

    return (
      <FormGroup color={classes}>
        <Input {...input} type={type} placeholder={placeholder} state={classes} />
        {touched && error && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
    );
  }
}