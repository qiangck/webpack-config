import React from 'react';
export default class Info extends React.Component {
  render () {
    return (
      <span>{ process.env.NODE_ENV }</span>
    );
  }
}
