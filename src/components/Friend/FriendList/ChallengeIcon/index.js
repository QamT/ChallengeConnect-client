import React from 'react';
import { string, func, arrayOf, bool } from 'prop-types';
import { Icon } from 'semantic-ui-react';

const ChallengeIcon = ({ friend, sendChallenge, challengeSent = [], inChallenge, challengeId, active }) => {
  let classes = '', title = 'can not send request now', tabIndex='';

  if (inChallenge && challengeId) {
    classes = 'team';
    title = 'part of current challenge';
  } else if (challengeSent.find(request => request.toString() === friend.toString())) {
    classes = 'request';
    title = 'challenge request sent';
  } else if (!active && challengeId) {
    classes='available';
    title = 'send request to join my challenge';
    tabIndex='0';
  };
 
  return (
    <Icon
      className={classes}
      name='check'
      title={title}
      aria-label={title}
      onClick={classes.includes('available') ? e => sendChallenge(e, friend): null}
      onKeyDown={classes.includes('available') ? e => sendChallenge(e, friend) : null}
      tabIndex={tabIndex}
      disabled={title.includes('not')}
    />
  )
}

ChallengeIcon.propTypes = {
  friend: string.isRequired,
  sendChallenge: func.isRequired,
  challengeSent: arrayOf(string),
  inChallenge: bool,
  challengeId: string,
  active: bool
}

export default ChallengeIcon;

