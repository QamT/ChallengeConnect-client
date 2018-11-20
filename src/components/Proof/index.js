import React from 'react';

export default ({ proof }) => {
  let proofStatus;
  if (proof.uploaded && proof.challenged) {
    proofStatus = <span className='currentChallenge__proof currentChallenge__proof--challenged'>
                    &#9745;
                  </span>;
  } else if (proof.uploaded) {
    proofStatus = <span className='currentChallenge__proof currentChallenge__proof--uploaded'>
                    &#9745;
                  </span>;
  } else {
    proofStatus = <span className='currentChallenge__proof currentChallenge__proof--clear'>
                    &#9745;
                  </span>;
  }

  return (
    <>
      {proofStatus}
    </>
  )
}