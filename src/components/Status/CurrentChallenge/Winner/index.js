import React from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';

import { resetChallenge } from '../../../../actions/user';

export class Winner extends React.Component {
  static propTypes = {
    winner: string.isRequired,
    challengeId: string.isRequired,
    teamId: string.isRequired,
    userTeam: string.isRequired
  }

  resetChallenge = e => {
    const { challengeId, teamId, dispatch } = this.props;
    if (e.key === 'Enter' || e.type === 'click') dispatch(resetChallenge(challengeId, teamId));
  }

  render() {
    const { winner, userTeam } = this.props;
    const isWinner = userTeam === winner;
 
    return (
      <div className='container'>
        <div className={`winnerCard ${!isWinner && winner !== 'both' ? 'winnerCard--second' : null}`}>
          {isWinner || winner === 'both' ?
            <img 
              src='https://res.cloudinary.com/qamnodeapp/image/upload/v1546773803/cup.png'
              alt='trophy for first place'
              height='100'
              width='100'
            /> :
            <img 
              className='darker'
              src='https://res.cloudinary.com/qamnodeapp/image/upload/v1546835819/silver-medal.png'
              alt='medal for second place'
              height='100'
              width='100'
            />
          }
          <div>
            <h3>{isWinner || winner === 'both' ? <>Congratulations</> : <>Challenge Over</>}</h3>
            <p>
              {isWinner ? 
                <>Your team has completed all the challenges.</> : isWinner === 'both' ? 
                <>Both teams have completed all the challenges.</> :
                <>Other team has completed all the challenges.</>
              }
            </p>
            <button 
              className='btn-done'
              onClick={this.resetChallenge} 
              onKeyDown={this.resetChallenge}
              aria-label='finish with challenge'
            >
              Cool
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  challengeId: state.challenge.challengeId,
  teamId: state.challenge.teamId,
  userTeam: state.team.teamA.members.find(member => member.id === state.user.userId) ? 'a' : 'b',
});

export default connect(mapStateToProps)(Winner);



