import React from 'react';
import { arrayOf, func, string, bool, object, shape } from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Icon } from 'semantic-ui-react';

const AdminActive = ({ proofs = [], acceptProof, denyProof, adminId, teamId }) => (
  <>
    <h4 className='infoBox-title'>Proofs Challenged</h4>
    <ul>
      <TransitionGroup component={null}>
        {proofs.map(proof => (
          <CSSTransition key={proof.id} timeout={375} classNames='slide'>
            <li>
              <span>
                {proof.url.charAt(proof.url.length - 1) === '4' ? 
                  <span className='proof'>
                    <video controls width='100' height='75'>
                      <source src={proof.url} type='video/mp4'/>
                      <p><a href={proof.url} target='_blank' rel='noopener noreferrer'>{proof.user.name} proof</a></p>
                    </video>
                  </span> :
                  <span className='proof'>
                    <img src={proof.url} alt={`${proof.user.name} proof`} height='75' width='100' />
                  </span>
                }
                <span className='highlight'><span>Reason:</span>{proof.reason}</span>
              </span>
              <span className='btn-actions btn-actions--vertical'>
                <Icon 
                  name='checkmark' 
                  title='accept proof'
                  aria-label='accept proof'
                  circular 
                  onClick={e => acceptProof(e, proof.id, adminId)} 
                  onKeyDown={e => acceptProof(e, proof.id, adminId)} 
                  tabIndex='0' 
                />
                <Icon 
                  name='close' 
                  title='reject proof'
                  aria-label='reject proof'
                  circular 
                  onClick={e => denyProof(e, proof.id, adminId, proof.user.id, teamId)} 
                  onKeyDown={e => denyProof(e, proof.id, adminId, proof.user.id, teamId)}  
                  tabIndex='0' 
                />
              </span>
            </li>
          </CSSTransition>))
        }
      </TransitionGroup> 
      {!proofs.length && <li>No proofs challenged</li>}
    </ul>
  </>
)

AdminActive.propTypes = {
  proofs: arrayOf(shape({
    id: string.isRequired,
    url: string,
    challenged: bool.isRequired,
    user: object,
    reason: string
  })),
  acceptProof: func.isRequired,
  denyProof: func.isRequired
}

export default AdminActive;
