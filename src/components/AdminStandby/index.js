import React from 'react';
import { arrayOf, shape, string, object } from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Icon } from 'semantic-ui-react';

import Profile from '../Profile';

const AdminStandby = ({ requests = [], acceptUser, rejectUser, challengeId, teamId, adminId }) => (
  <>
    <h4 className='infoBox-title'>Challenge Requests</h4>
    <ul>
      <TransitionGroup component={null}>
        {requests.map(user => (
          <CSSTransition key={user.id} timeout={375} classNames='slide'>
            <li>
              <span>
                <Profile user={user} size={42} side='right' />
                <span className='highlight'><span>Team {user.group.toUpperCase()}</span>{user.firstName} {user.lastName}</span>
              </span>
              <span className='btn-actions'>
                <Icon 
                  name='checkmark' 
                  title='accept user for challenge'
                  aria-label='accept user for challenge'
                  circular 
                  onClick={e => acceptUser(e, adminId, user.id, challengeId, user.group, teamId)
                  } 
                  onKeyDown={e => acceptUser(e, adminId, user.id, challengeId, user.group, teamId)
                  } 
                  tabIndex='0' 
                />
                <Icon 
                  name='close' 
                  title='reject user for challenge'
                  aria-label='reject user for challenge'
                  circular 
                  onClick={e => rejectUser(e, adminId, user.id, challengeId)} 
                  onKeyDown={e => rejectUser(e, adminId, user.id, challengeId)} 
                  tabIndex='0' 
                />
              </span>
            </li>
          </CSSTransition>))
        }
      </TransitionGroup> 
      {requests.length === 0 && <li>No challenge requests</li>}
    </ul>
  </>
)

AdminStandby.propTypes = {
  requests: arrayOf(shape({
    id: string.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
    profilePic: object,
    about: string,
    group: string.isRequired
  }))
}

export default AdminStandby;

