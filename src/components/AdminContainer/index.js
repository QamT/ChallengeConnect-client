import React from 'react';
import { bool, string, number } from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import Admin from '../Admin';
import { activateChallenge } from '../../actions/challenge';

export class AdminContainer extends React.Component {
  static propTypes = {
    challengeId: string.isRequired,
    active: bool.isRequired,
    teamA: number.isRequired,
    teamB: number.isRequired
  }

  state = {
    error: null
  }

  startChallenge = e => {
    const { teamA, teamB, challengeId, dispatch } = this.props;
    this.setState({ error: null });

    if (e.key === 'Enter' || e.type === 'click') {
      if (!teamB || !teamA) return this.setState({ error: 'Must have at least one member on both teams' });
      dispatch(activateChallenge(challengeId));
    }
  }

  render() {
    const { error } = this.state;

    return (
      <>
        {error && <span className='admin-error'>{error}</span>}
        <Admin />
        {!this.props.active && 
          <span
            className='btn-activate' 
            onClick={this.startChallenge}
            onKeyDown={this.startChallenge}
            title='start challenge'
            aria-label='start challenge'
            tabIndex='0'
          >
            <Icon name='angle right' className='arrow1' />
            <Icon name='angle right' className='arrow2' />
          </span>
        }
      </>
    )
  }
}

const mapStateToProps = state => ({
  challengeId: state.challenge.challengeId,
  active: state.challenge.active,
  teamA: state.team.teamA.members.length,
  teamB: state.team.teamB.members.length,
});

export default connect(mapStateToProps)(AdminContainer);

