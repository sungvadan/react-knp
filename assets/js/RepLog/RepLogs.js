import React from 'react';
import PropTypes from 'prop-types'
import RepLogList from "./RepLogList";
import RepLogCreator from './RepLogCreator';
// import RepLogCreator from './RepLogCreatorControlledComponent';

function calculTotalWeightLifted(repLogs) {
  let totalWeight = 0;

  for (let repLog of repLogs) {
    totalWeight += repLog.totalWeightLifted
  }

  return totalWeight;
}

const calculateTotalWeightLifted = repLogs => repLogs.reduce((total, repLog) => total + repLog.totalWeightLifted, 0);

export default function RepLogs(props){

  const {
    withHeart,
   highlightedRowId,
   repLogs,
   onRowClick,
   onNewItemSubmit,
   numberOfHearts,
   onHeartChange,
   onDeleteRepLog,
   isLoaded,
   isSavingNewRepLog,
    successMessage,
  } = props;

  let heart = '';
  if (withHeart) {
    heart = <span>{'<3'.repeat(numberOfHearts)}</span>;
  }

  return (
    <div className="col-md-7">
      <h2>
        Lift History {heart}
      </h2>

      <input
        type="range"
        value={numberOfHearts}
        onChange={(e) => {
          onHeartChange(+e.target.value)
        }}
      />
      <table className="table table-striped">
        <thead>
        <tr>
          <th>What</th>
          <th>How many times?</th>
          <th>Weight</th>
          <th>&nbsp;</th>
        </tr>
        </thead>
        <RepLogList
          highlightedRowId={highlightedRowId}
          repLogs={repLogs}
          onRowClick={onRowClick}
          onDeleteRepLog={onDeleteRepLog}
          isLoaded={isLoaded}
          isSavingNewRepLog={isSavingNewRepLog}
          successMessage={successMessage }
        />
        <tfoot>
        <tr>
          <td>&nbsp;</td>
          <th>Total</th>
          <th>{calculateTotalWeightLifted(repLogs)}</th>
          <td>&nbsp;</td>
        </tr>
        </tfoot>
      </table>

      <div className="row">
        <div className="col_md-6">
          <RepLogCreator onNewItemSubmit={onNewItemSubmit}/>
        </div>
      </div>
    </div>
  )
}

RepLogs.propTypes = {
  withHeart: PropTypes.bool,
  numberOfHearts: PropTypes.number.isRequired,
  highlightedRowId: PropTypes.any,
  repLogs: PropTypes.array,
  onRowClick: PropTypes.func.isRequired,
  onNewItemSubmit: PropTypes.func.isRequired,
  onHeartChange: PropTypes.func.isRequired,
  onDeleteRepLog: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool,
  isSavingNewRepLog: PropTypes.bool,
  successMessage: PropTypes.string
}