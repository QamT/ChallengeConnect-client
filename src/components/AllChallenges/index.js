import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import ChallengeCard from '../ChallengeCard';
import { requestChallenge } from '../../actions/user';

export class AllChallenges extends React.Component {
  requestChallenge = (e, challengeId, adminId, group) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.dispatch(requestChallenge(challengeId, adminId, group));
    }
  }

  render() {
    const { challenges, teams, request } = this.props;

    return (
      <>
        <ul className='grid'>
         {challenges.map((challenge, index) => (
           <ChallengeCard 
            requestChallenge={this.requestChallenge}
            key={uuid()}
            admin={challenge.admin} 
            challengeId={challenge.id}
            request={request}
            title={challenge.title}
            challenges={challenge.challenges}
            teamA={teams[index].teamA.team}
            teamB={teams[index].teamB.team}
           />
         ))}
        </ul>
      </>
    )
  }
}

const mapStateToProps = state => ({
  challenges: state.global.challenges,
  teams: state.global.teams,
  request: state.user.challengeRequested.id 
});

export default connect(mapStateToProps)(AllChallenges);
