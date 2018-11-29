import React from 'react';
import ChallengeNav from '../ChallengeNav';
import Content from '../Content';
import { connect } from 'react-redux';

export default class Challenge extends React.Component {
 state = {
   filter: 'Challenges'
 }

 changeFilter = (filter) => {
   this.setState({ filter })
 }

 render() {
    return (
      <div>
        <h1 onClick={this.test}>ChallengeConnect</h1>
        <ChallengeNav filter={this.state.filter} changeFilter={this.changeFilter} filters={['Leaderboard', 'Challenges', `Friend's List`]} />
        <Content current={this.state.filter} />
      </div>
    )
  }
}



