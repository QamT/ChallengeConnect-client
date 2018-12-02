import React from 'react';

<<<<<<< HEAD
export default ({ className = 'modal', closeModal=null, data=null }) => {
  // let content = 'no data';
  // if (data) {
  //   const { team, proofInfo: proof } = data;
  //   content = (() => {
  //     switch(team) {
  //       case 'a':
  //         if(proof.uploaded && proof.challenged) {
  //           return 'challenged by other team'
  //         } else if (proof.uploaded) {
  //           return 'teammate submitted proof'
  //         } else {
  //           return 'not uploaded by team'
  //         }
  //       case 'b': 
  //         if(proof.uploaded && proof.challenged) {
  //           return 'proof is being reviewed by admin'
  //         } else if (proof.uploaded) {
  //           return 'other team submitted proof'
  //         } else {
  //           return 'other team has not uploaded proof'
  //         }
  //       default:
  //         return 'no data'
  //     }
  //   })()
  // }
=======
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
>>>>>>> 919878c6e821db29ca43cf89afb65ddb3329a6b0

  return (
    <div onClick={closeModal} className={className}>
      <div className='modal-content'>
<<<<<<< HEAD
        yes
=======
        {content}
>>>>>>> 919878c6e821db29ca43cf89afb65ddb3329a6b0
      </div>
    </div>
  )
}