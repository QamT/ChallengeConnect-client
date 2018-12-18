import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import ProofUpload from '../ProofUpload';
import ProofView from '../ProofView';
import { uploadProof } from '../../actions/proof';
import { challengeProof } from '../../actions/proof';
import { addScoreA, addScoreB } from '../../actions/team';

export class ProofCard extends React.Component {
  state = {
    file: '',
    error: null
  }

  onUploadSubmit = file => {
    const { proof, teamId, team } = this.props;
    if (!/^.*\.(jpg|jpeg|png|mp4)$/.test(file.name)) {
      this.setState({ error: 'File must be an image or video' });
      return;
    }
    this.setState({ error: null });
    this.setState({ file: file.name });

    setTimeout(() => {
      this.props.dispatch(uploadProof(proof.id, teamId, team, file));
      team === 'a' ? this.props.dispatch(addScoreA) : this.props.dispatch(addScoreB);
    }, 1500);
  }

  onChallengeSubmit = reason => {
    const { proof, adminId } = this.props;
    this.props.dispatch(challengeProof(proof.id, adminId, reason));
  }

  render() {
    const { proof, team, userTeam, displayProof } = this.props;
    const noAction = userTeam !== team && !proof.url;

    if (noAction) return null;

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

export default connect(mapStateToProps)(ProofCard);

