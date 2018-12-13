import React from 'react';
import { connect } from 'react-redux';

import CurrentChallenge from '../CurrentChallenge';
import AllChallenges from '../AllChallenges';
import AddChallenge from '../AddChallenge';
import ChallengeInfo from '../ChallengeInfo';
import Chat from '../Chat';
import Loader from '../Loader';
import { fetchChallenge } from '../../actions/challenge';
import { fetchAllChallenges } from '../../actions/global';

export class Status extends React.Component {
  componentDidMount() {
    this.props.currentChallenge ? 
      this.props.dispatch(fetchChallenge(this.props.currentChallenge)) : this.props.dispatch(fetchAllChallenges())
  }

  componentDidUpdate(prevProps) {
     if (this.props.currentChallenge && prevProps.currentChallenge !== this.props.currentChallenge) {
       this.props.dispatch(fetchChallenge(this.props.currentChallenge));
     }
     
     if (!this.props.currentChallenge && prevProps.currentChallenge !== this.props.currentChallenge) {
      this.props.dispatch(fetchAllChallenges());
    }
  }

  render() {
    const { currentChallenge, direction, loading } = this.props;
    let className='challenges';
    if (loading) return <Loader />

    if (direction === 'right') className='challenges challenges-left';
    if (direction === 'left') className='challenges challenges-right';
    
    return (
      <div className={className}>
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

export default connect(mapStateToProps)(Status);