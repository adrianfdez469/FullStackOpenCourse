import React from 'react';

const StatitsticLine = ({ text, data }) => {

  return (
    <tr>
      <td>
        {text}:
      </td>
      <td>
        {data}
      </td>
    </tr>
  );

}
export default StatitsticLine;