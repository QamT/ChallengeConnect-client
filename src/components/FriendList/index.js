import React from 'react';
import Search from '../Search';
import Friend from '../Friend';

export default () => (
  <div>
    <Search users={['Miles', 'John']}  />
    <Friend friends={['Kathy', 'Sarah', 'Melinda']} />
    {/* <Result /> */}
  </div>
)