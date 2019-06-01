import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class RepLogCreator extends Component{

  constructor(props) {
    super(props);

    this.state = {
      quantityInputError: '',
      selectedItemId: '',
      quantityValue: 0

    };

    this.itemOptions = [
      {id: 'cat', text: 'Cat'},
      {id: 'fat_cat', text: 'Big Fat Cat'},
      {id: 'laptop', text: 'My Laptop'},
      {id: 'coffee_cup', text: 'Coffee cup'},
    ];

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSelectItemChange = this.handleSelectItemChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  handleSelectItemChange(event) {
    this.setState({
      selectedItemId: event.target.value
    })
  }

  handleQuantityChange(event) {
    this.setState({
      quantityValue: event.target.value
    })
  }


  handleFormSubmit(event) {
    event.preventDefault();

    const {quantityValue, selectedItemId} = this.state;

    const { onNewItemSubmit } = this.props;

    if (quantityValue <= 0) {
      this.setState({
        quantityInputError: 'please enter a value greater than 0'
      });
      return;
    }

    const itemLabel = this.itemOptions.find((option) => {
      return option.id === selectedItemId;
    }).text;

    onNewItemSubmit(
      itemLabel,
      quantityValue

    );

    this.setState({
      quantityInputError: '',
      quantityValue: '',
      selectedItemId: 0
    });
  };

  render() {
    const { quantityInputError, selectedItemId, quantityValue  } = this.state;
    return (
      <form onSubmit={(event)=>this.handleFormSubmit(event)}>
        <div className="form-group">
          <label className="sr-only control-label required" htmlFor="rep_log_item">
            What did you lift?
          </label>
          <select id="rep_log_item"
                  value={selectedItemId}
                  onChange={this.handleSelectItemChange}
                  required="required"
                  className="form-control">
            <option value="">What did you lift?</option>
            {this.itemOptions.map(option => {
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
                 value={quantityValue}
                 onChange={this.handleQuantityChange}
                 required="required"
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
  onNewItemSubmit: PropTypes.func.isRequired
};