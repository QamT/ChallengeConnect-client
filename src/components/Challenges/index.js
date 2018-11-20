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
        {user.currentChallengeId || user.admin.isAdmin ? 
          <CurrentChallenge 
            user={user}
            currentChallenge = {currentChallenge}
            teams={teams}
          /> : 
          <AddChallenge />
        }
        <AllChallenges challenges={[`Katy's Challenge`, `Megan's Challenge`]}/>
        <Chat />
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