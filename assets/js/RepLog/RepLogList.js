import React from 'react'
import PropTypes from 'prop-types'

export default function RepLogList(props){
  const  repLogs = [
    { id: 1, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 120 },
    { id: 2, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 120 },
    { id: 3, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 120 },
  ];
  const {highlightedRowId, onRowClick} = props;

  return (
    <tbody>
    {repLogs.map((repLog) => (
      <tr
        key={repLog.id}
        className={highlightedRowId === repLog.id ? 'info' : ''}
        onClick={()=>onRowClick(repLog.id)}
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

RepLogList.propTypes = {
  highlightedRowId: PropTypes.any,
  onRowClick: PropTypes.func.isRequired
};