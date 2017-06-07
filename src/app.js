import React from 'react';
import {render} from 'react-dom';
import Info from './info';
export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  render () {
    return (
      <div>
        环境变量是：<Info />
      </div>
    );
  }
}
render(<App/>, document.getElementById('app'));
