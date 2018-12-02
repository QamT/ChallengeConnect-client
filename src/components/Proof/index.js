import React from 'react';
import { connect } from 'react-redux';

<<<<<<< HEAD
import { fetchProof } from '../../actions/proof';

export class Proof extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchProof(this.props.proofId, this.props.team));
  }

  render() {
    const proof = this.props.challenged[this.props.team][this.props.index]
    const { team, displayModal } = this.props
    let proofUrl;
    let challenged;
    if (this.props.loading) return <span>&#9745;</span>
    
    if (proof) {
      challenged = proof.challenged;
      proofUrl = proof.url || null;
    }
    
    let proofStatus;
    if (proofUrl && challenged) {
      proofStatus = <span 
                      className='challengeCard__proof challengeCard__proof--challenged'
                      onClick={() => displayModal(team, proofUrl)} 
                    >
                      &#9745;
                    </span>;
    } else if (proofUrl) {
      proofStatus = <span 
                      className='challengeCard__proof challengeCard__proof--uploaded'
                      onClick={() => displayModal(team, proofUrl)} 
                    >
                      &#9745;
                    </span>;
    } else {
      proofStatus = <span 
                      className='challengeCard__proof challengeCard__proof--clear'
                      onClick={() => displayModal(team)} 
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
  proofUrl: {
    a: state.proof.proofA,
    b: state.proof.proofB
  },
  challenged: {
    a: state.proof.proofA,
    b: state.proof.proofB
  }
});

export default connect(mapStateToProps)(Proof);
=======
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
>>>>>>> 919878c6e821db29ca43cf89afb65ddb3329a6b0
