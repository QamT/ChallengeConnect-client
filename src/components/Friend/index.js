import React from 'react';

export default ({ friends }) => {
  const list = friends.map((friend => <li>{friend} <span>x</span></li>))

  return (
    <div>
      <ul>
        {list}
      </ul>
    </div>
  )
}