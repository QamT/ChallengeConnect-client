import React from 'react';
import { connect } from 'react-redux';

import LeaderScore from '../LeaderScore';
import Loader from '../Loader';
import { fetchLeaderboard } from '../../actions/global'

export class Leaderboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchLeaderboard());
  }

  render() {
    if (this.props.loading) return <Loader />;
    
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