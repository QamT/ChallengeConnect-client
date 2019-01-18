import React from 'react';
import { string, func, bool } from 'prop-types';

const ProofView = ({ proofUrl, proofUser, ownTeam, onSubmit, challenged }) => {
  const type = proofUrl.charAt(proofUrl.length - 1) === '4' ? 'video' : 'image';
  let challengeInput = null;

  const onChallengeSubmit = e => {
    e.preventDefault();
    onSubmit(challengeInput.value);
  };

  return (
    <div className='proof__card-view'>
      {type === 'image' ? 
        <span><img src={proofUrl} height='175' alt={`${proofUser} proof`} /></span> :
        <span>
          <video controls height='175'>
            <source src={proofUrl} type='video/mp4'/>
            <p><a href={proofUrl} target='_blank' rel='noopener noreferrer'>{proofUser} proof</a></p>
          </video>
        </span>
      }
      {ownTeam && !challenged ? 
        <p className='info'>Proof by <span>{proofUser}</span></p> : !challenged ?
        <form onSubmit={onChallengeSubmit}>
          <input 
            type='text' 
            name='reason' 
            aria-label='reason for challenge'
            ref={input => challengeInput = input} 
            maxLength='30'
            placeholder='Reason' 
            autoComplete='off'
            required
          />
          <button type='submit' aria-label='challenge proof'>Challenge Proof</button>
        </form> : <p>Challenged Proof Under Review</p>
      }
    </div>
  )
}

ProofView.propTypes = {
  proofUrl: string.isRequired,
  proofUser: string.isRequired,
  ownTeam: bool.isRequired,
  onSubmit: func.isRequired,
  challenged: bool.isRequired
}

export default ProofView;






