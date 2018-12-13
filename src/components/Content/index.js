import React from 'react';
import { CSSTransition } from 'react-transition-group';

import Leaderboard from '../Leaderboard';
import Friend from '../Friend';
import Status from '../Status';

export default class Content extends React.Component {
  state = {
    direction: ''
  }

  componentDidUpdate(prevProps) {
    const { current } = this.props;
    if (current === 'Status' && prevProps.current === 'Leaderboard') this.setDirection('left');
    if (current === 'Status' && prevProps.current === `Friend's List`) this.setDirection('right');
    if (current === 'Leaderboard' && prevProps.current !== current) this.setDirection('left');
    if (current === `Friend's List` && prevProps.current !== current) this.setDirection('right');
  }

  setDirection(direction) {
    this.setState({ direction });
  }

  render() {
    const { current} = this.props;
    
    return (
      <main role='main'>
        <CSSTransition timeout={400} in={current === 'Leaderboard'} enter={false} classNames='left' unmountOnExit>
          <Leaderboard />
        </CSSTransition>
        <CSSTransition timeout={400} in={current === `Friend's List`} enter={false} classNames='right' unmountOnExit>
          <Friend />
        </CSSTransition>
        {current === 'Status' && <Status direction={this.state.direction} />}
      </main>
    )
  }
}


