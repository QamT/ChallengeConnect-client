import React from 'react';
import { Icon } from 'semantic-ui-react';
import { CSSTransition } from 'react-transition-group';

import ProfileCard from '../ProfileCard';

export default class Profile extends React.Component {
  state = {
    showProfile: false
  }

  displayProfile = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.setState(prevState => ({ showProfile: !prevState.showProfile }));
    }
  }

  render() {
    const { user } = this.props;
    
    return (
      <div className='profile'>
        {user.profilePic.url ? 
          <img
            src={user.profilePic.url} 
            onClick={this.displayProfile}
            onKeyDown={this.displayProfile}
            alt={`${user.firstName} profile`}
            height='50'
            width='50'
            tabIndex='0'
          /> :
          <Icon 
            name='user' 
            circular 
            size='large' 
            color='teal' 
            inverted 
            onClick={this.displayProfile} 
            onKeyDown={this.displayProfile}
            tabIndex='0' 
            aria-label={`${user.firstName} profile`}
          />
        }
        <CSSTransition timeout={400} in={this.state.showProfile} classNames='expand' unmountOnExit>
          <ProfileCard user={user} displayProfile={this.displayProfile} />
        </CSSTransition>
      </div>
    )
  }
}
