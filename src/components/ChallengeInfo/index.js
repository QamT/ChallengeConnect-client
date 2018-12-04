import React from 'react';
import { connect } from 'react-redux';

import { fetchChallengeInfo } from '../../actions/user';

export class ChallengeInfo extends React.Component {
  componentDidMount() {
    if (this.props.challengeId) this.props.dispatch(fetchChallengeInfo(this.props.challengeId));
  }

  render() {
    return (
      <span tabIndex='0' data-content={this.props.title} className='challengeInfo'>
        I
      </span>
    )
  }
}
  
const mapStateToProps = state => ({
  challengeId: state.user.challengeRequested.id,
  title: state.user.challengeRequested.title || 'No challenged requested yet.'
});

export default connect(mapStateToProps)(ChallengeInfo);


