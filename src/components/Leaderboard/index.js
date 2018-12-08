import React from 'react';
import { connect } from 'react-redux';

import LeaderScore from '../LeaderScore';
import { fetchLeaderboard } from '../../actions/global'

export class Leaderboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchLeaderboard());
  }

  render() {
    if (this.props.loading) return <div>Loading...</div>
    console.log(this.props.leaders)
    return (
        <div className='leaderboard'>
          <div className='leaderboard__container'>
            <h3>Leaderboard</h3>
            <LeaderScore leaders={this.props.leaders} />
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.global.boardLoading,
  leaders: state.global.leaders
})

export default connect(mapStateToProps)(Leaderboard);