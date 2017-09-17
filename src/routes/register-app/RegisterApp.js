/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RegisterApp.css';

class RegisterApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', description: '', type: 'mini' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clearInput() {
    this.setState({ value: '', description: '', type: 'mini' });
  }
  handleSubmit(event) {
    alert(
      `An app was submitted: \n${this.state.value}\n${this.state.description}`,
    );

    this.clearInput();
  }
  onSubmit = () => {
    this.setState({finalMsg: 'App registered'});
    this.handleSubmit();

  }

  render() {
    const { state, ...props } = this.props;
    return (
      <g>
        <form>
          <h1>Register Your App !!</h1>
          <label>
            Application Name:
            <br />
            <input
              type="text"
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
            />
          </label>
          <br />
          <label>
            Application Description:
            <br />
            <input
              type="text"
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
            />
          </label>
          <br />
          <label>
            Number of requests handling required in a minute:
            <br />
            <select
              value={this.state.type}
              onChange={e => this.setState({ type: e.target.value })}
            >
              <option value="mini">less than 10</option>
              <option value="small">10-50</option>
              <option value="large">50-100</option>
              <option value="giant">more than 100</option>
            </select>
            <br />
          </label>
          <button className={s.submitbutton} onClick={this.onSubmit}> Register </button>
        </form>
      </g>
    );
  }
}

export default withStyles(s)(RegisterApp);
