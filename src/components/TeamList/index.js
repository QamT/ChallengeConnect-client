import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

<<<<<<< HEAD
export class TeamList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let spots=[];
    const team = this.props.team === 'A' ? this.props.teamA : this.props.teamB;
    for (let i = team.length; i<5; i++) {
      spots.push(<li key={uuid()}>---</li>);
    }
    
    const teamList = team.map(member => (
      <li key={uuid()}>
        <span>{member.profilePic.url || 'profInfo'}</span>

        {`${member.firstName} ${member.lastName}`}
      </li>
    ))

    return (
      <div className='challengeCard__team'>
        <ul>
          {teamList}
          {spots}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  teamId: state.team.teamId,
  teamA: state.team.teamA.members,
  teamB: state.team.teamB.members
});

export default connect(mapStateToProps)(TeamList);
=======
export default ({ team=null, myTeam=false }) => {
  let checks = 1;
  let spots=[];

  if ((team.length < 4 && myTeam) || team.length < 4) {
    let blankSpots = `${myTeam ? 3 : 4}` - team.length;

    for (let i = 0; i<blankSpots; i++) {
      spots.push(<li>---</li>);
    }
  }

  return (
    <div className='challengeCard__team'>
      <ul>
        {myTeam && <li>Me <span>{('✔').repeat(checks)}</span></li>}
        {team && team.map(team => <li>{team}</li>)}
        {spots}
      </ul>
    </div>
  )
}
>>>>>>> 919878c6e821db29ca43cf89afb65ddb3329a6b0
