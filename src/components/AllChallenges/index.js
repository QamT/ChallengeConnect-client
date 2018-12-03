import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import ChallengeCard from '../ChallengeCard';
import { requestChallenge } from '../../actions/user';

export class AllChallenges extends React.Component {
  onClickRequest = (challengeId, adminId, group, teamId) => {
    this.props.dispatch(requestChallenge(challengeId, adminId, group, teamId));
  }

  render() {
    const { challenges, teams } = this.props;

    return (
      <div>
        <ul className='grid'>
         {challenges.map((challenge, index) => (
           <ChallengeCard 
            onClickRequest={this.onClickRequest}
            key={uuid()}
            admin={challenge.admin} 
            challengeId={challenge.id}
            title={challenge.title}
            challenges={challenge.challenges}
            teamId={challenge.teams}
            teamA={teams[index].teamA.team}
            teamB={teams[index].teamB.team}
           />
         ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  challenges: state.global.challenges,
  teams: state.global.teams
})

export default connect(mapStateToProps)(AllChallenges);


