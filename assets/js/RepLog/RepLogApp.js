import React, { Component } from 'react'

export default class RepLogApp extends Component
{
  render() {
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
            <tr key={repLog.id}>
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
      </div>
    )
  }
}
