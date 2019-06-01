import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'
import RepLogs from './RepLogs'

export default class RepLogApp extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      highlightedRowId: null,
      repLogs: [
        { id: uuid(), reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 120 },
        { id: uuid(), reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 120 },
        { id: uuid(), reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 120 },
      ]
    };

    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleNewItemSubmit = this.handleNewItemSubmit.bind(this);
  }

  handleRowClick(repLogId) {
    this.setState({highlightedRowId: repLogId});
  }

  handleNewItemSubmit(itemLabel, reps) {

    const repLogs = this.state.repLogs;
    const newReps = {
      id: uuid(),
      reps: reps,
      itemLabel: itemLabel,
      totalWeightLifted: 156
    }
    repLogs.push(newReps);
    this.setState({repLogs: repLogs })

  }

  render() {
    return(
      <RepLogs
        {...this.props}
        {...this.state}
        onRowClick={this.handleRowClick}
        onNewItemSubmit={this.handleNewItemSubmit}
      />
    )

  }
}

RepLogApp.propTypes = {
  withHeart: PropTypes.bool
}