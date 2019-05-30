import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RepLogs from './RepLogs'

export default class RepLogApp extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      highlightedRowId: null,
      repLogs: [
        { id: 1, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 120 },
        { id: 2, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 120 },
        { id: 3, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 120 },
      ]
    };

    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleRowClick(repLogId) {
    this.setState({highlightedRowId: repLogId});
  }

  render() {
    return(
      <RepLogs
        {...this.props}
        {...this.state}
        onRowClick={this.handleRowClick}
      />
    )

  }
}

RepLogApp.propTypes = {
  withHeart: PropTypes.bool
}