import React from 'react';
import { shape, string, bool, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'semantic-ui-react';

import ProofUpload from '../ProofUpload';
import ProofView from '../ProofView';
import { uploadProof, challengeProof } from '../../actions/team'

export class ProofCard extends React.Component {
  static propTypes = {
    proof: shape({
      _id: string.isRequired,
      url: string,
      challenged: bool.isRequired,
      user: object,
      reason: string
    }).isRequired,
    team: string.isRequired,
    displayProof: func.isRequired,
    userTeam: string.isRequired,
    adminId: string.isRequired,
    teamId: string.isRequired
  }

  state = {
    file: '',
    error: null
  }

  onUploadSubmit = file => {
    const { proof, teamId, team, uploadProof, displayProof } = this.props;
    if (!/^.*\.(jpg|jpeg|png|mp4)$/.test(file.name)) {
      return this.setState({ error: 'File must be an image or video' });
    }

    this.setState({ error: null });
    this.setState({ file: file.name });
    uploadProof(proof._id, teamId, team, file);
    setTimeout(() => {
      const e = { key: 'Enter'};
      displayProof(e);
    }, 800);
  }

  onChallengeSubmit = reason => {
    const { proof, adminId, teamId, challengeProof } = this.props;
    challengeProof(proof._id, adminId, teamId, reason);
  }

  render() {
    const { proof, team, userTeam, displayProof } = this.props;
  
    if (userTeam !== team && !proof.url) return null;
    
    return (
      <div className='proof__card'>
        <Icon name='caret right' />
        {!proof.url && 
          <ProofUpload 
            onSubmit={this.onUploadSubmit} 
            file={this.state.file} 
            displayProof={displayProof} 
            error={this.state.error}
          />
        }
        {proof.url && 
          <ProofView 
            proofUrl={proof.url} 
            proofUser={proof.user.name} 
            challenged={proof.challenged}
            ownTeam={team === userTeam} 
            onSubmit={this.onChallengeSubmit}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userTeam: state.team.teamA.members.find(member => member.id === state.user.userId) ? 'a' : 'b',
  adminId: state.challenge.adminId,
  teamId: state.team.teamId
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    uploadProof,
    challengeProof,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ProofCard);



