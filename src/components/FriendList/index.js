import React from 'react';

export default ({ friends }) => {
  const list = friends.map((friend => <li>{friend} <span>x</span></li>))

  return (
    <div className='friendsList'>
      <ul className='friendsList__container'>
        {list}
      </ul>
    </div>
  )
}