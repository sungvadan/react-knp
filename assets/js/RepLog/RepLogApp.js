import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
      isSavingNewRepLog: false,
      successMessage: '',
      newRepLogValidationErrorMessage: ''
    };

    this.successMessageTimeoutHandle = 0;

    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleNewItemSubmit = this.handleNewItemSubmit.bind(this);
    this.handleHeartChange = this.handleHeartChange.bind(this);
    this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this);
    this.setSuccessMessage = this.setSuccessMessage.bind(this);
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

  componentWillUnmount() {
    clearTimeout(this.successMessageTimeoutHandle);
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
    };

    this.setState({
      isSavingNewRepLog: true
    });

    createRepLog(newReps)
      .then(repLog => {
        this.setState(prevState => {
          const repLogs = [...prevState.repLogs, repLog];

          return {
            repLogs: repLogs,
            isSavingNewRepLog: false,
            newRepLogValidationErrorMessage: '',
          }
        })
        this.setSuccessMessage('Rep log Saved!');
      })
      .catch(error => {
        error.response.json().then(errorData => {
          const errors = errorData.errors;
          const firstError = errors[Object.keys(errors)[0]];

          this.setState({
            newRepLogValidationErrorMessage: firstError
          })
        })
      });
  }

  setSuccessMessage(message) {
    this.setState({
      successMessage: message
    });

    clearTimeout(this.successMessageTimeoutHandle);

    this.successMessageTimeoutHandle = setTimeout(() => {
      this.setState({
        successMessage: ''
      });
      this.successMessageTimeoutHandle = 0;
    }, 3000)
  }
  handleDeleteRepLog(id) {
    this.setState((prevState) => {
      return {
        repLogs: prevState.repLogs.map(repLog => {
          if (repLog.id !== id) {
            return repLog;
          }
          return Object.assign({}, repLog, {isDeleting: true})
        })
      }
    })
    deleteRepLog(id);
    // remove the repo log without mutating state
    // filter returns a new array
    this.setState(prevState => {
      return {
        repLogs: prevState.repLogs.filter(repLog => repLog.id !== id)
      }
    });
    this.setSuccessMessage('Rep log removed!');
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