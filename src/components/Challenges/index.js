import React from 'react';
import { connect } from 'react-redux';

import CurrentChallenge from '../CurrentChallenge';
import AllChallenges from '../AllChallenges';
import AddChallenge from '../AddChallenge';
import ChallengeInfo from '../ChallengeInfo';
import Chat from '../Chat';
import { fetchChallenge } from '../../actions/challenge';
import { fetchAllChallenges } from '../../actions/global';

export class Challenges extends React.Component {
  componentDidMount() {
    this.props.currentChallenge ? 
      this.props.dispatch(fetchChallenge(this.props.currentChallenge)) : this.props.dispatch(fetchAllChallenges())
  }

  render() {
    const { currentChallenge } = this.props;
    if (this.props.loading) return <div>---loading---</div>
    return (
      <div>
        {!currentChallenge && <ChallengeInfo />}
        {currentChallenge ? 
          <CurrentChallenge /> : 
          <AddChallenge />
        }
        {!currentChallenge && <AllChallenges />}
        <Chat className={`chat chat--${currentChallenge ? 'big' : 'small'}`} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.user.currentChallenge ? state.challenge.loading : state.global.loading,
  currentChallenge: state.user.currentChallenge
});

export default connect(mapStateToProps)(Challenges);