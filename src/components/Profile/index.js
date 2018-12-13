import React from 'react';
import { Icon } from 'semantic-ui-react';

import ProfileCard from '../ProfileCard';

export default ({ user }) => (
  <div className='profile'>
    {user.profilePic.url ? 
      <img
        src={user.profilePic.url} 
        alt='user profile'
        height='50'
        width='50'
      /> :
      <Icon name='user' size='big' />
    }
    <ProfileCard user={user} />
  </div>
)

//build profile card
//show info only if image clicked
//transition on info

// -styling
// -refactor
// -accessibility
// -transitions and animations

// -error handling
// -clean structure and names
// -best practices


