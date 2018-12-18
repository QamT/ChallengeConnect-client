import React from 'react';
import { Icon } from 'semantic-ui-react';
import { CSSTransition } from 'react-transition-group';

import ProofCard from '../ProofCard';

export default class Proof extends React.Component {
  state = {
    showProof: false
  }

  displayProof = e => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.setState(prevState => ({ showProof: !prevState.showProof }));
    }
  }

  render() {
    const { proof = null, team } = this.props;
    const proofClass = (proof && proof.challenged) ? 'proof--challenged' : (proof && proof.url) ? 'proof--uploaded' : null;
  
    return (
      <div className={`proof ${proofClass}`}>
        <Icon 
          name='check circle' 
          onClick={this.displayProof} 
          onKeyDown={this.displayProof}
          title='view proof' 
          tabIndex='0' 
        />
        <CSSTransition timeout={400} in={this.state.showProof} classNames='expand' unmountOnExit>
          <ProofCard proof={proof} team={team} displayProof={this.displayProof} />
        </CSSTransition>
      </div>
    )
  }
}
