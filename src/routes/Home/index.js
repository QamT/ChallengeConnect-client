import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
      <h1 className='home'>Home</h1>
      <Link to='/register'>Sign Up</Link>
      <Link to='/login'>Log In</Link>
  </div>
)
