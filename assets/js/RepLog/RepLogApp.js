import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'
import RepLogs from './RepLogs'
import {getRepLogs , deleteRepLog, createRepLog } from '../api/rep_log_api'

export default class RepLogApp extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      highlightedRowId: null,
      repLogs: [],
      numberOfHearts: 1,
      idLoaded: false,
    };

    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleNewItemSubmit = this.handleNewItemSubmit.bind(this);
    this.handleHeartChange = this.handleHeartChange.bind(this);
    this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this);
  }

  componentDidMount() {
    getRepLogs()
      .then((data)=> {
        this.setState({
          repLogs: data,
          isLoaded: true,
        })
      })
  }

  handleHeartChange(numberOfHearts) {
    this.setState({
      numberOfHearts: numberOfHearts
    })
  }

  handleRowClick(repLogId) {
    this.setState({highlightedRowId: repLogId});
  }

  handleNewItemSubmit(item, reps) {

    const newReps = {
      reps: reps,
      item: item,
    }

    createRepLog(newReps)
      .then(repLog => {
        this.setState(prevState => {
          const repLogs = [...prevState.repLogs, repLog];

          return {repLogs: repLogs }
        })
      });
  }

  handleDeleteRepLog(id) {
    deleteRepLog(id);
    // remove the repo log without mutating state
    // filter returns a new array
    this.setState(prevState => {
      return {
        repLogs: prevState.repLogs.filter(repLog => repLog.id !== id)
      }
    });
  }

  render() {
    return(
      <RepLogs
        {...this.props}
        {...this.state}
        onRowClick={this.handleRowClick}
        onNewItemSubmit={this.handleNewItemSubmit}
        onHeartChange={this.handleHeartChange}
        onDeleteRepLog={this.handleDeleteRepLog}
      />
    )

  }
}

RepLogApp.propTypes = {
  withHeart: PropTypes.bool
}