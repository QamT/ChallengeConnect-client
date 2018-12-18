import React from 'react';

import Search from '../Search';
import FriendList from '../FriendList';
import FriendInfo from '../FriendInfo';

export default () => (
  <section className='friend'>
    <Search />
    <FriendInfo />
    <FriendList />
  </section>
)
