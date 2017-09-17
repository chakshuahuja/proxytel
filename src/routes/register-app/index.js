/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import RegisterApp from './RegisterApp';

const title = 'Register App';

function action() {
  return {
    chunks: ['register-app'],
    title,
    component: (
      <Layout>
        <RegisterApp title={title} />
      </Layout>
    ),
    status: 404,
  };
}

export default action;
