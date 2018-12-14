import React from 'react';
import { connect } from 'react-redux';

import LeaderCard from '../LeaderCard';
import Loader from '../Loader';
import { fetchLeaderboard } from '../../actions/global'

export class Leaderboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchLeaderboard());
  }

  render() {
    if (this.props.loading) return <Loader />;
   
    return (
      <section className='leaderboard'>
        <div className='leaderboard__container'>
          <LeaderCard leaders={this.props.leaders} />
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.global.boardLoading,
  leaders: state.global.leaders
})

export default connect(mapStateToProps)(Leaderboard);

