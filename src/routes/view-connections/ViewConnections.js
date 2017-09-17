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
import s from './ViewConnections.css';

class ViewConnections extends React.Component {
  render() {
    const data = [
      {
        to_pn: '+16505672212',
        to_virtual_pn: '+16508962222',
        from_pn: '+16506729999',
        from_virtual_pn: '+16593238888',
        recording: 'dummy.wav',
        insights: 'dummy.png',
      },
      {
        to_pn: '+16505671111',
        to_virtual_pn: '+16508962223',
        from_pn: '+16506729999',
        from_virtual_pn: '+1659323333',
        recording: 'dummy2.wav',
        insights: 'dummy2.png',
      },
      {
        to_pn: '+16505671211',
        to_virtual_pn: '+14208962223',
        from_pn: '+16503229999',
        from_virtual_pn: '+1639323333',
        recording: 'dummy3.wav',
        insights: 'dummy3.png',
      },
    ];
    const rows = [];
    data.forEach(item => {
      rows.push(
        <tr>
          <td>
            {item.to_pn}
          </td>
          <td>
            {item.to_virtual_pn}
          </td>
          <td>
            {item.from_pn}
          </td>
          <td>
            {item.from_virtual_pn}
          </td>
          <td>
            {item.recording}
          </td>
          <td>
            {item.insights}
          </td>
        </tr>,
      );
    });
    return (
      <table>
        <thead>
          <th>To Phone Number</th>
          <th>To Virtual Phone Number</th>
          <th>From Phone Number</th>
          <th>From Virtual Phone Number</th>
          <th>Recording Download</th>
          <th>Insights</th>
        </thead>
        {rows}
      </table>
    );
  }
}

export default withStyles(s)(ViewConnections);
