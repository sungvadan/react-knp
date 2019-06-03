import React from 'react'
import PropTypes from 'prop-types'

export default function RepLogList(props){

  const {
    highlightedRowId,
    repLogs,
    onRowClick,
    onDeleteRepLog,
    isLoaded,
    isSavingNewRepLog,
    successMessage
  } = props;

  const handleDeleteClick = (event, repLogId) => {
    event.preventDefault();
    onDeleteRepLog(repLogId);
  }

  if (!isLoaded) {
    return (
      <tbody>
        <tr>
          <td colSpan="4" className="text-center">Loading...</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
    {successMessage && (
      <tr>
        <td
          colSpan='4'
          className='text-center alert alert-success'
        >{successMessage}</td>
      </tr>
    )}
    {repLogs.map((repLog) => (
      <tr
        key={repLog.id}
        className={highlightedRowId === repLog.id ? 'info' : ''}
        onClick={()=>onRowClick(repLog.id)}
        style={{
          opacity: repLog.isDeleting? .3 : 1
        }}
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
    {isSavingNewRepLog && (
      <tr>
        <td
          colSpan='4'
          className='text-center'
          style={{
            opacity: 0.5
          }}
        >Lifting to the database ...</td>
      </tr>
    )}
    </tbody>
  )
}

RepLogList.propTypes = {
  highlightedRowId: PropTypes.any,
  repLogs: PropTypes.array,
  onRowClick: PropTypes.func.isRequired,
  onDeleteRepLog: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool,
  isSavingNewRepLog: PropTypes.bool,
  successMessage: PropTypes.string,
};