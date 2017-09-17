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
import ViewConnections from './ViewConnections';
import fetch from 'isomorphic-fetch';

const title = 'View Connections';

async function action({fetch}) {
  const resp = await fetch('http://localhost:3000/connections');
  const conns = await resp.json();
  
  return {
    title,
    component: (
      <Layout>
        <ViewConnections title={title} data={conns}/>
      </Layout>
    ),
    status: 404,
  };
}

export default action;
