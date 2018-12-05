import React from 'react';
import { connect } from 'react-redux';

import ProofView from '../ProofView';
import ProofForm from'../ProofForm';
import { uploadProof } from '../../actions/proof';
import { challengeProof } from '../../actions/proof';

export class ProofModal extends React.Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillMount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  uploadProofSubmit = (file) => {
    const { proofId, proofGroup: group} = this.props.data;
    const { teamId } = this.props;
    this.props.dispatch(uploadProof(proofId, teamId, group, file));
  }

  challengeProofSubmit = (reason) => {
    const { proofId } = this.props.data;
    const { adminId } = this.props;
    this.props.dispatch(challengeProof(proofId, adminId, reason));
  }

  handleClick = (e) => {
    if (this.modal.contains(e.target)) return;
    if (this.props.className === 'modal display-modal') this.props.closeModal();
  }

  render() {
    const { teamId, className, closeModal, data } = this.props;
    let content;

    if (data) {
      const { challenged, proofId, proofGroup, proofUrl, userTeam } = data;
      if (userTeam === proofGroup && !challenged && proofUrl) {
        content = <ProofView proofUrl={proofUrl} text='your team has uploaded proof' /> 
      } else if (userTeam === proofGroup && !challenged) {
        content = <ProofForm action='upload' uploadProof={this.uploadProofSubmit} />
      } else if (!challenged && proofUrl) {
        content = <ProofForm action='challenge' proofUrl={proofUrl} challengeProof={this.challengeProofSubmit} />
      } else if (!challenged && !proofUrl) {
        content = <ProofView text='other team has not uploaded proof yet' />
      } else if (challenged) {
        content = <ProofView proofUrl={proofUrl}  text='this proof has been challenged' /> 
      }
    }
  
    return (
      <div className={className}>
        <div className='modal-content' ref={modal => this.modal = modal}>
          {content}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  teamId: state.team.teamId,
  adminId: state.challenge.adminId
});

export default connect(mapStateToProps)(ProofModal);
