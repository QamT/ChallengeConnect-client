import React from 'react';

import Search from '../Search';
import FriendList from '../FriendList';

export default () => (
  <div>
    <Search users={['Miles', 'John']}  />
    <FriendList friends={['Kathy', 'Sarah', 'Melinda']} />
    {/* <Result /> */}
  </div>
)