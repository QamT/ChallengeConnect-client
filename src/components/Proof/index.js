import React from 'react';

export default ({ team, proof, active, displayModal }) => {
  let proofStatus;

  if (!active) {
    proofStatus = <span 
                    className='challengeCard__proof challengeCard__proof--clear'
                  >
                    &#9745;
                  </span>;
  }

  if (proof.uploaded && proof.challenged && active) {
    proofStatus = <span 
                    className='challengeCard__proof challengeCard__proof--challenged'
                    onClick={() => displayModal(team, proof)} 
                  >
                    &#9745;
                  </span>;
  } else if (proof.uploaded && active) {
    proofStatus = <span 
                    className='challengeCard__proof challengeCard__proof--uploaded'
                    onClick={() => displayModal(team, proof)} 
                  >
                    &#9745;
                  </span>;
  } else if (active) {
    proofStatus = <span 
                    className='challengeCard__proof challengeCard__proof--clear'
                    onClick={() => displayModal(team, proof)} 
                  >
                    &#9745;
                  </span>;
  }
  
  return (
    <>
      {proofStatus}
    </>
  )
}