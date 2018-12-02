import React from 'react';
import { connect } from 'react-redux';

import ChallengeNav from '../ChallengeNav';
import Content from '../Content';
import { fetchUserInfo } from '../../actions/user';

export class Challenge extends React.Component {
 state = {
   filter: 'Challenges'
 }

 componentDidMount() {
  this.props.dispatch(fetchUserInfo());
 }

 changeFilter = (filter) => {
   this.setState({ filter })
 }

<<<<<<< HEAD
 render() {
    return (
      <div>
        <h1>ChallengeConnect</h1>
        <ChallengeNav filter={this.state.filter} changeFilter={this.changeFilter} filters={['Leaderboard', 'Challenges', `Friend's List`]} />
        { (this.props.loading) ?
          <div>Loading...</div> :
          <Content current={this.state.filter} />
        }
=======
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
>>>>>>> 919878c6e821db29ca43cf89afb65ddb3329a6b0
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.loading
})

export default connect(mapStateToProps)(Challenge)




