import React from 'react';
import { shape, string, bool, object } from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { CSSTransition } from 'react-transition-group';

import ProofCard from '../ProofCard';

export default class Proof extends React.Component {
  static propTypes = {
    proof: shape({
      _id: string.isRequired,
      url: string,
      challenged: bool.isRequired,
      user: object,
      reason: string
    }).isRequired,
    team: string.isRequired
  }

  state = {
    showProof: false
  }

  displayProof = e => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.setState(prevState => ({ showProof: !prevState.showProof }));
    }
  }

  render() {
    const { proof, team } = this.props;
    const proofClass = proof.challenged ? 'proof--challenged' : proof.url ? 'proof--uploaded' : null;

    return (
      <div className={`proof ${proofClass}`}>
        <Icon 
          name='check circle' 
          onClick={this.displayProof} 
          onKeyDown={this.displayProof}
          title='view proof' 
          aria-label='view proof'
          tabIndex='0' 
        />
        <CSSTransition timeout={400} in={this.state.showProof} classNames='expand' unmountOnExit>
          <ProofCard proof={proof} team={team} displayProof={this.displayProof} />
        </CSSTransition>
      </div>
    )
  }
}

