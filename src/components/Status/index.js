import React from 'react';
import { connect } from 'react-redux';

import CurrentChallenge from '../CurrentChallenge';
import AllChallenges from '../AllChallenges';
import AddChallenge from '../AddChallenge';
import Chat from '../Chat';
import Loader from '../Loader';
import { fetchChallenge } from '../../actions/challenge';
import { fetchAllChallenges } from '../../actions/global';

export class Status extends React.Component {
  componentDidMount() {
    this.props.currentChallenge ? 
      this.props.dispatch(fetchChallenge(this.props.currentChallenge)) : this.props.dispatch(fetchAllChallenges());
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
    if (direction === 'right') className='challenges challenges-left';
    if (direction === 'left') className='challenges challenges-right';

    if (loading) return <Loader />
    
    return (
      <section className={className}>
        {currentChallenge ? <CurrentChallenge /> : <AddChallenge />}
        {!currentChallenge && <AllChallenges />}
        <Chat className={`chat chat--${currentChallenge ? 'big' : 'small'}`} />
      </section>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.user.currentChallenge ? state.challenge.loading : state.global.loading,
  currentChallenge: state.user.currentChallenge
});

export default connect(mapStateToProps)(Status);

// -error handling
// -responsiveness
// -styling
// -refactor
// -loading indicator
// -edge cases
// -accessibility
// -clean structure and names
// -understand code
// -transitions and animations
// -best practices
// -mock data