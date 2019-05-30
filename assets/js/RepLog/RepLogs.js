import React from 'react';
import PropTypes from 'prop-types'
import RepLogList from "./RepLogList";

function calculTotalWeightLifted(repLogs) {
  let totalWeight = 0;

  for (let repLog of repLogs) {
    totalWeight += repLog.totalWeightLifted
  }

  return totalWeight;
}

const calculateTotalWeightLifted = repLogs => repLogs.reduce((total, repLog) => total + repLog.totalWeightLifted, 0);

export default function RepLogs(props){

  const { withHeart, highlightedRowId, repLogs, onRowClick } = props;

  let heart = '';
  if (withHeart) {
    heart = <span>Love</span>;
  }

  return (
    <div className="col-md-7">
      <h2>
        Lift History {heart}
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
        <RepLogList
          highlightedRowId={highlightedRowId}
          repLogs={repLogs}
          onRowClick={onRowClick}
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

RepLogs.propTypes = {
  withHeart: PropTypes.bool,
  highlightedRowId: PropTypes.any,
  repLogs: PropTypes.array,
  onRowClick: PropTypes.func.isRequired
}