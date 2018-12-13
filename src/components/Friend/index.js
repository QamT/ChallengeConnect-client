import React from 'react';

import Search from '../Search';
import FriendList from '../FriendList';
import FriendInfo from '../FriendInfo';

export default () => (
  <div className='friend'>
    <Search />
    <FriendInfo />
    <FriendList />
  </div>
)

