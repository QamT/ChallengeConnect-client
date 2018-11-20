import React from 'react';

export default ({ filters }) => (
  <div className='challengeNav'>
    <ul>
      {filters.map(filter => <li tabIndex='0'>{filter}</li>)}
    </ul>
  </div>
)