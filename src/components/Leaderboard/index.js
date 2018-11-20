import React from 'react';
import { connect } from 'react-redux';

import LeaderScore from '../LeaderScore';
import { fetchLeaderboardSuccess } from '../../actions/leaderboard'

export class Leaderboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchLeaderboardSuccess());
  }

  render() {
    return (
      <div>
        <h1>Leaderboard</h1>
        <LeaderScore leaders={this.props.leaders} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  leaders: state.leaderboard.leaders
})

export default connect(mapStateToProps)(Leaderboard);