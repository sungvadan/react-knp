import React, { Component } from 'react'

export default class RepLogList extends Component{
  render() {

    const  repLogs = [
      { id: 1, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 120 },
      { id: 2, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 120 },
      { id: 3, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 120 },
    ];
    const {highlightedRowId} = this.props;

    return (
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
    )
  }

}