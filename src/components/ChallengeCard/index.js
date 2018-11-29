import React from 'react';

export default ({ challenge }) => (
  <>
    <li className='challengeCard'>
      <div className='challengeCard__container'>
        {challenge}
      </div>
    </li>
  </>
)