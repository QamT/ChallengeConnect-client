import React from 'react';
import { connect } from 'react-redux';

import { fetchProof } from '../../actions/proof';

export class Proof extends React.Component {
 componentDidMount() {
    this.props.dispatch(fetchProof(this.props.proofId, this.props.team));
  }

  render() {
    const { index } = this.props;
    const proof = this.props.proof[this.props.team][index]
    const { team, displayModal } = this.props
    let proofUrl;
    let challenged;
    if (this.props.loading) return <span className='challengeCard__proof challengeCard__proof--clear'>&#9745;</span>
    
    if (proof) {
      challenged = proof.challenged;
      proofUrl = proof.url || null;
    }
    
    let proofStatus;
    if (proofUrl && challenged) {
      proofStatus = <span 
                      className='challengeCard__proof challengeCard__proof--challenged'
                      onClick={() => displayModal(challenged, team, proof.id, proofUrl)} 
                    >
                      &#9745;
                    </span>;
    } else if (proofUrl) {
      proofStatus = <span 
                      className='challengeCard__proof challengeCard__proof--uploaded'
                      onClick={() => displayModal(challenged, team, proof.id, proofUrl)} 
                    >
                      &#9745;
                    </span>;
    } else {
      proofStatus = <span 
                      className='challengeCard__proof challengeCard__proof--clear'
                      onClick={() => displayModal(challenged, team, proof.id)} 
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
}

const mapStateToProps = state => ({
  loading: state.proof.loading,
  proof: {
    a: state.proof.proofA,
    b: state.proof.proofB
  }
});

export default connect(mapStateToProps)(Proof);
