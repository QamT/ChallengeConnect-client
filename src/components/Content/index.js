import React from 'react';
import { string } from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import Leaderboard from '../Leaderboard';
import Friend from '../Friend';
import Status from '../Status';

const Content = ({ current, prev = '' }) => {
  const s = 'Status', f = `Friend's List`, l = 'Leaderboard';
  const direction = (() => {
    switch(prev) {
      case l:
        return 'left';
      case f:
        return 'right';
      default: 
        return null;
    }
  })();
  const classStatus = (() => {
    switch(current) {
      case l:
        return prev === s ? 'right' : '';
      case f:
        return prev === s ? 'left' : '';
      default:
        return '';
    }
  })();

  return (
    <main role='main'>
      <CSSTransition timeout={400} in={current === 'Leaderboard'} enter={false} classNames='left' unmountOnExit>
        <Leaderboard />
      </CSSTransition>
      <CSSTransition timeout={400} in={current === `Friend's List`} enter={false} classNames='right' unmountOnExit>
        <Friend />
      </CSSTransition>
      <CSSTransition timeout={400} in={current === `Status`} enter={false} classNames={classStatus} unmountOnExit>
        <Status direction={direction} />
      </CSSTransition>
    </main>
  )
}

Content.propTypes = {
  current: string.isRequired,
  prev: string
}

export default Content;


