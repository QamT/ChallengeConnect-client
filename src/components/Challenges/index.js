import React from 'react';
import { connect } from 'react-redux';

import CurrentChallenge from '../CurrentChallenge';
import AllChallenges from '../AllChallenges';
import AddChallenge from '../AddChallenge';
import Chat from '../Chat';
import { fetchChallenge } from '../../actions/challenge'

export class Challenges extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchChallenge(this.props.currentChallenge));
  }

  render() {
    const { currentChallenge } = this.props;
    if (this.props.loading) return <div>---loading---</div>
    return (
      <div>
<<<<<<< HEAD
        {currentChallenge ? 
          <CurrentChallenge /> : 
          <AddChallenge />
        }
        {!currentChallenge && <AllChallenges />}
        <Chat className={`chat chat--${currentChallenge ? 'big' : 'small'}`} />
=======
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
>>>>>>> 919878c6e821db29ca43cf89afb65ddb3329a6b0
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.challenge.loading,
  currentChallenge: state.user.currentChallenge
});

export default connect(mapStateToProps)(Challenges);