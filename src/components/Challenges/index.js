import React from 'react';
import { connect } from 'react-redux';

import CurrentChallenge from '../CurrentChallenge';
import AllChallenges from '../AllChallenges';
import AddChallenge from '../AddChallenge';
import Chat from '../Chat';
import { fetchChallengeSuccess } from '../../actions/challenge'

export class Challenges extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchChallengeSuccess());
  }

  render() {
    const { user, teams, currentChallenge } = this.props

    return (
      <div>
        {user.currentChallengeId ? 
          <CurrentChallenge 
            user={user}
            currentChallenge = {currentChallenge}
            teams={teams}
          /> : 
          <AddChallenge />
        }
        {!user.currentChallengeId && <AllChallenges challenges={[`Katy's Challenge`, `Megan's Challenge`, `Peter's Challenge`, `Kevin's Challenge`]}/>}
        <Chat className={`chat chat--${user.currentChallengeId ? 'big' : 'small'}`} />
      </div>
    )
  }
}

//finish current challenge [admin control, active, upload]

const mapStateToProps = state => ({
  currentChallenge: state.challenge.currentChallenge,
  teams: state.team.teams,
  user: state.user.user
})

export default connect(mapStateToProps)(Challenges);