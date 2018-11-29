import React from 'react';

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