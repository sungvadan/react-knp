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
      ],
      numberOfHearts: 1
    };

    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleNewItemSubmit = this.handleNewItemSubmit.bind(this);
    this.handleHeartChange = this.handleHeartChange.bind(this);
  }

  handleHeartChange(numberOfHearts) {
    this.setState({
      numberOfHearts: numberOfHearts
    })
  }

  handleRowClick(repLogId) {
    this.setState({highlightedRowId: repLogId});
  }

  handleNewItemSubmit(itemLabel, reps) {

    const newReps = {
      id: uuid(),
      reps: reps,
      itemLabel: itemLabel,
      totalWeightLifted: 156
    }

    this.setState(prevState => {
      const repLogs = [...prevState.repLogs, newReps];

      return {repLogs: repLogs }
    })
  }

  render() {
    return(
      <RepLogs
        {...this.props}
        {...this.state}
        onRowClick={this.handleRowClick}
        onNewItemSubmit={this.handleNewItemSubmit}
        onHeartChange={this.handleHeartChange}
      />
    )

  }
}

RepLogApp.propTypes = {
  withHeart: PropTypes.bool
}