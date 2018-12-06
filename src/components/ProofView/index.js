import React from 'react';

export default ({ proofUrl = '', text }) => (
  <div>
    {proofUrl && <img src={proofUrl} alt='proof' />}
    <p>{text}</p>
  </div>
)