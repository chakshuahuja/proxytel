/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Link from '../../components/Link';
import IntroImg from './intro.png';

class Home extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Introducing the ProxyTel plaftform</h1>
          <img src={IntroImg} width="500" height="308" alt="React" />
          <Link className={s.link} to="/register-app">
            <h2>Let's Get Started</h2>
          </Link>
          <h3> Already registered? Connect to look at the insights </h3>
          <Link className={s.link} to="/view-connections">
            <h3>View Open Connections</h3>
          </Link>
          <br />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
