import React from 'react'
import PropTypes from 'prop-types'

export default function RepLogList(props){

  const {highlightedRowId, repLogs, onRowClick, onDeleteRepLog} = props;

  const handleDeleteClick = (event, repLogId) => {
    event.preventDefault();
    onDeleteRepLog(repLogId);
  }

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
        <td>
          <a href="#">
            <span className='fa fa-trash' onClick={(event)=>handleDeleteClick(event, repLog.id)}></span>
          </a>
        </td>
      </tr>
    ))}
    </tbody>
  )
}

RepLogList.propTypes = {
  highlightedRowId: PropTypes.any,
  repLogs: PropTypes.array,
  onRowClick: PropTypes.func.isRequired,
  onDeleteRepLog: PropTypes.func.isRequired
};