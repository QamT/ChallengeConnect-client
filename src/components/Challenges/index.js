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
  loading: state.challenge.loading,
  currentChallenge: state.user.currentChallenge
});

export default connect(mapStateToProps)(Challenges);