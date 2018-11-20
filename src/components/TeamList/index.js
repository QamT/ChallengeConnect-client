import React from 'react';

export default ({ team=null, otherTeam=null }) => {
  let checks = 1;

  return (
    <div className='currentChallenge__team'>
      <ul>
        { team && <li>Me <span>{('✔').repeat(checks)}</span></li> }
        {
          team ? team.map(team => <li>{team}</li>) : 
                otherTeam.map(team => <li>{team}</li>)
        }
      </ul>
    </div>
  )
}