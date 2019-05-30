import React from 'react'
import PropTypes from 'prop-types'

export default function RepLogList(props){

  const {highlightedRowId, repLogs, onRowClick} = props;

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
  repLogs: PropTypes.array,
  onRowClick: PropTypes.func.isRequired
};