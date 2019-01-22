import React from 'react';
import { shape, string, arrayOf, object } from 'prop-types';
import { connect } from 'react-redux';

import ChallengeInfo from './ChallengeInfo';
import ChallengeCard from './ChallengeCard';
import { requestChallenge } from '../../../actions/user';

export class AllChallenges extends React.Component {
  static propTypes = {
    challenges: arrayOf(shape({
      id: string,
      admin: string,
      title: string,
      challenges: arrayOf(string),
    })).isRequired,
    teams: arrayOf(shape({
      id: string,
      teamA: object,
      teamB: object
    })).isRequired,
    requested: arrayOf(string)
  }

  requestChallenge = (e, challengeId, adminId, group) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.dispatch(requestChallenge(challengeId, adminId, group));
    }
  }

  render() {
    const { challenges, teams, requested } = this.props;

    return (
      <>
        <h3 className='challengeCard-title'>
          <span>
            Join a challenge
            <ChallengeInfo />
          </span>
        </h3>
        <ul className='grid'>
         {challenges.map((challenge, index) => (
           <ChallengeCard 
            requestChallenge={this.requestChallenge}
            key={challenge.id}
            admin={challenge.admin} 
            challengeId={challenge.id}
            request={requested}
            title={challenge.title}
            challenges={challenge.challenges}
            teamA={teams[index].teamA.team}
            teamB={teams[index].teamB.team}
           />))
          }
        </ul>
      </>
    )
  }
}

const mapStateToProps = state => ({
  challenges: state.global.challenges,
  teams: state.global.teams,
  requested: state.user.challengeRequested
});

export default connect(mapStateToProps)(AllChallenges);
