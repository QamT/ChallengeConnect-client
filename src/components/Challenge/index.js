import React from 'react';
import ChallengeNav from '../ChallengeNav';
import Content from '../Content';
import { connect } from 'react-redux';

export default class Challenge extends React.Component {
 render() {
    return (
      <div>
        <div>{this.props.challenges}</div>
        <h1 onClick={this.test}>ChallengeConnect</h1>
        <ChallengeNav filters={['Leaderboard', 'Challenges', `Friend's List`]} />
        <Content current={`Challenge`} />
      </div>
    )
  }
}



