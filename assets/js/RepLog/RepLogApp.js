import React, { Component } from 'react'

export default class RepLogApp extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      highlightedRowId: null,
    }
  }
  render() {
    const { highlightedRowId } = this.state;

    let heart = '';
    if (this.props.withHeart) {
      heart = <span>Love</span>;
    }
    const  repLogs = [
      { id: 1, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 120 },
      { id: 2, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 120 },
      { id: 3, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 120 },
    ];

    return (
      <div className="col-md-7">
        <h2>
          Lift History
        </h2>

        <table className="table table-striped">
          <thead>
          <tr>
            <th>What</th>
            <th>How many times?</th>
            <th>Weight</th>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          {repLogs.map((repLog) => (
            <tr
              key={repLog.id}
              className={highlightedRowId === repLog.id ? 'info' : ''}
              onClick={() => this.setState({highlightedRowId: repLog.id})}
            >
              <td>{repLog.itemLabel}</td>
              <td>{repLog.reps}</td>
              <td>{repLog.totalWeightLifted}</td>
              <td>...</td>
            </tr>
          ))}
          </tbody>
          <tfoot>
          <tr>
            <td>&nbsp;</td>
            <th>Total</th>
            <th>TODO</th>
            <td>&nbsp;</td>
          </tr>
          </tfoot>
        </table>

        <form className="form-inline" noValidate>
          <div className="form-group">
            <label className="sr-only control-label required" htmlFor="rep_log_item">
              What did you lift?
            </label>
            <select id="rep_log_item"
                    name="item"
                    required="required"
                    className="form-control">
              <option value="">What did you lift?</option>
              <option value="cat">Cat</option>
              <option value="fat_cat">Big Fat Cat</option>
              <option value="laptop">My Laptop</option>
              <option value="coffee_cup">Coffee Cup</option>
            </select>
          </div>
          { ' ' }
          <div className="form-group">
            <label className="sr-only control-label required" htmlFor="rep_log_reps">
              How many times?
            </label>
            <input type="number" id="rep_log_reps"
                   name="reps" required="required"
                   placeholder="How many times?"
                   className="form-control"/>
          </div>
          { ' ' }
          <button type="submit" className="btn btn-primary">I Lifted it!</button>
        </form>

      </div>
    )
  }
}
