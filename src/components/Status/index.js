import React from 'react';
import { bool, string } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CSSTransition } from 'react-transition-group';

import CurrentChallenge from './CurrentChallenge';
import AllChallenges from './AllChallenges';
import AddChallenge from './AddChallenge';
import Chat from '../Chat';
import Loader from '../Loader';
import { fetchChallenge } from '../../actions/challenge';
import { fetchAllChallenges } from '../../actions/global';

export class Status extends React.Component {
  static propTypes = {
    currentChallenge: string,
    winner: string,
    direction: string,
    loading: bool.isRequired
  }

  state = {
    displayChat: false
  }

  componentDidMount() {
    const { currentChallenge, fetchChallenge, fetchAllChallenges } = this.props;
    currentChallenge ? fetchChallenge(currentChallenge) : fetchAllChallenges();
    setTimeout(() => this.setState({ displayChat: true }), 800);
  }

  componentDidUpdate(prevProps) {
    const { currentChallenge, fetchChallenge, fetchAllChallenges } = this.props;

     if (currentChallenge && prevProps.currentChallenge !== currentChallenge) {
       fetchChallenge(currentChallenge);
     } 
     if (!currentChallenge && prevProps.currentChallenge !== currentChallenge) {
      fetchAllChallenges();
    }
  }

  render() {
    const { currentChallenge, direction, loading } = this.props;

    if (loading) return <Loader />
 
    return (
      <section className={`challenges ${direction && (direction === 'left' ? 'challenges-right' : 'challenges-left')}`}>
        {currentChallenge ? <CurrentChallenge /> : <AddChallenge />}
        <CSSTransition timeout={400} in={this.state.displayChat} classNames='fade' unmountOnExit>
          <Chat />
        </CSSTransition>
        {!currentChallenge && <AllChallenges />}
      </section>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.user.currentChallenge ? state.challenge.loading : state.global.loading,
  currentChallenge: state.user.currentChallenge
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchChallenge,
    fetchAllChallenges
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Status);




