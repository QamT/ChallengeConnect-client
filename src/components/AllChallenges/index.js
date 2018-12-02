import React from 'react';
import { connect } from 'react-redux';

import ChallengeCard from '../ChallengeCard';
import { fetchAllChallenges } from '../../actions/global';

export class AllChallenges extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllChallenges());
  }

  render() {
    return (
      <div>
        <ul className='grid'>
         <h2>hello</h2>
        </ul>
      </div>
    )
  }
}

export default connect()(AllChallenges);
