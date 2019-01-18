import React from 'react';
import { func, string } from 'prop-types';

export default class Timer extends React.Component {
  static propTypes = {
    time: string.isRequired,
    completeChallenge: func.isRequired
  }

  state = {
    minutes: 0,
    seconds: 0
  }

  componentDidMount() {
    const challengeTime = new Date(this.props.time).getTime();
    if (challengeTime < Date.now()) return this.props.completeChallenge();

    const timer = new Date(challengeTime - Date.now());
    const minutes = timer.getMinutes();
    const seconds = timer.getSeconds();
    this.setState({ minutes, seconds });
    this.setCountDown();
  }

  setCountDown() {
    const challengeTime = new Date(this.props.time).getTime();
    
    this.countDown = setInterval(() => {
      const time = new Date(challengeTime - Date.now());
      const seconds = time.getSeconds();
    
      if (seconds === 59) this.setState(prevState => ({ minutes: prevState.minutes - 1 }));
      this.setState({ seconds });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    const { minutes, seconds } = this.state;
    if ((prevState.minutes === minutes && minutes === 0 && seconds === 0)) {
      clearInterval(this.countDown);
      this.props.completeChallenge();
    }
  }

  componentWillUnmount() {
    clearInterval(this.countDown);
  }

  render() {
    const { minutes, seconds } = this.state;
    const minute = minutes < 10 ? `0${minutes}` : minutes;
    const second = seconds < 10 ? `0${seconds}` : seconds;
    
    return (
      <span className='timer'>
        {`${minute}:${second}`}
        <span 
          className='screenreader-only' 
          role='timer' 
          aria-live='polite'
        >
          {`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`}
        </span>
      </span>
    )
  }
}
