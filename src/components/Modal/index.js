import React from 'react';

export default ({ className = 'modal', closeModal, data }) => {
  let content = 'no data';
  if (data) {
    const { team, proofInfo: proof } = data;
    content = (() => {
      switch(team) {
        case 'a':
          if(proof.uploaded && proof.challenged) {
            return 'challenged by other team'
          } else if (proof.uploaded) {
            return 'teammate submitted proof'
          } else {
            return 'not uploaded by team'
          }
        case 'b': 
          if(proof.uploaded && proof.challenged) {
            return 'proof is being reviewed by admin'
          } else if (proof.uploaded) {
            return 'other team submitted proof'
          } else {
            return 'other team has not uploaded proof'
          }
        default:
          return 'no data'
      }
    })()
  }

  return (
    <div onClick={closeModal} className={className}>
      <div className='modal-content'>
        {content}
      </div>
    </div>
  )
}