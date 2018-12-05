import React from 'react';

export default class ProofForm extends React.Component {
  state = {
    file: null
  }

  onUploadSubmit = (e) => {
    e.preventDefault();
    this.props.uploadProof(this.state.file);
  }

  onChallengeSubmit = (e) => {
    e.preventDefault();
    this.props.challengeProof(this.input.value)
  }

  onChange = (e) => {
    this.setState({ file: e.target.files[0] })
  }

  render() {
    const { action, proofUrl = '' } = this.props;
    return (
        <>
          {action === 'upload' ? 
            <>
              <p>Your team has not uploaded proof yet.</p>
              <form onSubmit={this.onUploadSubmit}>
                <input 
                  type='file' 
                  name='proof' 
                  accept='.jpg, .png, .mp4'
                  aria-label='proof upload'
                  onChange = {this.onChange}
                  required
                />
                <button type='submit'>Upload Proof</button>
              </form>
            </> :
            <>
              <p>Challenge Proof</p>
              <img src={proofUrl} alt='proof' />
              <form onSubmit={this.onChallengeSubmit}>
                <label htmlFor='reason'>Reason:</label>
                <input 
                  type='text' 
                  id='reason'
                  name='reason' 
                  ref={input => this.input = input}
                  placeholder='reason'
                  required
                />
                <button type='submit'>Challenge Proof</button>
              </form>
            </>
          }
        </> 
    )
  }
}