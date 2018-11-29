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

 render() {
    return (
      <div>
        <h1>ChallengeConnect</h1>
        <ChallengeNav filter={this.state.filter} changeFilter={this.changeFilter} filters={['Leaderboard', 'Challenges', `Friend's List`]} />
        { (this.props.loading) ?
          <div>Loading...</div> :
          <Content current={this.state.filter} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.loading
})

export default connect(mapStateToProps)(Challenge)




