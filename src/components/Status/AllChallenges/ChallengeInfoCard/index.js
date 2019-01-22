import React from 'react';
import { arrayOf, func, object } from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Profile from '../../../Profile';

const ChallengeInfoCard = ({ requests = [], acceptChallenge, rejectChallenge }) => (
  <>
    <div className='infoBox infoBox--challenge'>
      <span className='infoBox-arrow infoBox-arrow--challenge'><Icon name='caret up' /></span>
      <h4 className='infoBox-title'>Challenge Requests</h4>
      <ul>
        <TransitionGroup component={null}>
          {requests.map(request => (
            <CSSTransition key={request.user._id} enter={false} timeout={375} classNames='slide'>
              <li>
                <span>
                  <Profile user={request.user} size={42} side='right' />
                  <span className='name'>{request.id.title}</span>
                </span>
                <span className='btn-actions'>
                  <Icon 
                    name='checkmark' 
                    title='accept challenge request'
                    aria-label='accept challenge request'
                    circular 
                    onClick={e => acceptChallenge(e, request.user._id, request.id._id, request.id.teams)} 
                    onKeyDown={e => acceptChallenge(e, request.user._id, requests.id._id, request.id.teams)} 
                    tabIndex='0' 
                  />
                  <Icon 
                    name='close' 
                    title='reject challenge request'
                    aria-label='reject challenge request'
                    circular 
                    onClick={e => rejectChallenge(e, request.user._id)} 
                    onKeyDown={e => rejectChallenge(e, request.user._id)} 
                    tabIndex='0' 
                  />
                </span>
              </li>
            </CSSTransition>)
            ) 
          }
        </TransitionGroup> 
        {requests.length === 0 && <li>No challenge requests</li>}
      </ul>
    </div>
  </>
)

ChallengeInfoCard.propTypes = {
  requests: arrayOf(object),
  acceptChallenge: func.isRequired,
  rejectChallenge: func.isRequired
}

export default ChallengeInfoCard;
