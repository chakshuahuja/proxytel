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
import InspectImg from './inspect.png';

class ViewConnections extends React.Component {
  download() {
    // fake server request, getting the file url as response
    setTimeout(() => {
      const response = {
        file: 'https://imgur.com/a/9jNNw',
      };
      // server sent the url to the file!
      // now, let's download:
      window.location.href = response.file;
      // you could also do:
      // window.open(response.file);
    }, 100);
  }
  render() {
    const rows = [];
    this.props.data["connections"][0].forEach(item => {
      rows.push(
        <tr>
          <td>
            {item.userPhone.msisdn}
          </td>
          <td>
            {item.userVirtualPhone.msisdn}
          </td>
          <td>
            {item.agentPhone.msisdn}
          </td>
          <td>
            {item.agenVirtualPhone.msisdn}
          </td>
          <td>
            <button onClick={this.download}>Download Recording </button>
          </td>
          <td>
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
