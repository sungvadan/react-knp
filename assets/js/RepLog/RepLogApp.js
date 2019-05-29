import React, { Component } from 'react'

export default class RepLogApp extends Component
{
  render() {
    let heart = '';
    if (this.props.withHeart) {
      heart = <span>Love</span>;
    }
    return (
        <h2>Lift stuff {heart}</h2>
      )
  }
}
