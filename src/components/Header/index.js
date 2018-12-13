import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import { logout } from '../../actions/auth';

export class Header extends React.Component {
  logout = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.dispatch(logout());
    }
  }

  render() {
    return (
      <header className='header' role='banner'>
        <h1>ChallengeConnect</h1>
        <button className='btn-logout' 
          onClick={this.logout}
          onKeyDown={this.logout} 
          aria-label='logout button'
        >
          <Icon name='sign-out' />Log Out
        </button>
      </header>
    )
  }
}

export default connect()(Header);