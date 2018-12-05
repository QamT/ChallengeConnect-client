import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

export class TeamList extends React.Component {
  
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
