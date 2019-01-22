import React from 'react';
import { func } from 'prop-types';
import { Icon } from 'semantic-ui-react';

const Header = ({ logout }) => (
  <header className='header' role='banner'>
    <h1>ChallengeConnect</h1>
    <button 
      className='btn-logout' 
      onClick={logout}
      onKeyDown={logout} 
      aria-label='logout'
    >
      <Icon name='sign-out' />Log Out
    </button>
  </header>
)

Header.propTypes = {
  logout: func.isRequired
}

export default Header;

//add profile edit 