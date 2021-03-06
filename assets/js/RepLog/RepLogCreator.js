import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class RepLogCreator extends Component{

  constructor(props) {
    super(props);

    this.state = {
      quantityInputError: ''
    };

    this.quantityInput = React.createRef();
    this.itemSelect = React.createRef();

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }


  handleFormSubmit(event) {
    event.preventDefault();

    const { onNewItemSubmit } = this.props;
    const quantityInput = this.quantityInput.current;
    const itemSelect = this.itemSelect.current;

    if (quantityInput.value <= 0) {
      this.setState({
        quantityInputError: 'please enter a value greater than 0'
      });
      return;
    }

    onNewItemSubmit(
      itemSelect.options[itemSelect.selectedIndex].value,
      quantityInput.value
    );

    quantityInput.value = '';
    itemSelect.selectedIndex = 0;
    this.setState({
      quantityInputError: ''
    });
  };

  render() {
    const { quantityInputError } = this.state;
    const { newRepLogValidationErrorMessage, itemOptions } = this.props;

    return (
      <form onSubmit={(event)=>this.handleFormSubmit(event)}>
        {newRepLogValidationErrorMessage && (
          <div className='alert alert-danger'>
            {newRepLogValidationErrorMessage}
          </div>
        )}
        <div className="form-group">
          <label className="sr-only control-label required" htmlFor="rep_log_item">
            What did you lift?
          </label>
          <select id="rep_log_item"
                  ref={this.itemSelect}
                  required="required"
                  className="form-control">
            <option value="">What did you lift?</option>
            {itemOptions.map(option => {
              return <option value={option.id} key={option.id}>{option.text}</option>
            })}
          </select>
        </div>
        { ' ' }
        <div className={`form-group ${quantityInputError? 'has-error' : ''}`}>
          <label className="sr-only control-label required" htmlFor="rep_log_reps">
            How many times?
          </label>
          <input type="number" id="rep_log_reps"
                 ref={this.quantityInput} required="required"
                 placeholder="How many times?"
                 className="form-control"/>
          {quantityInputError? <span className="help-block">{quantityInputError}</span>:''}
        </div>
        { ' ' }
        <button type="submit" className="btn btn-primary">I Lifted it!</button>
      </form>
    )
  }
}

RepLogCreator.propTypes = {
  onNewItemSubmit: PropTypes.func.isRequired,
  newRepLogValidationErrorMessage: PropTypes.func.isRequired,
  itemOptions: PropTypes.string
};