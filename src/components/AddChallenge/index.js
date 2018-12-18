import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import FlipCard from '../FlipCard';
import SelectChallenge from '../SelectChallenge';
import OwnChallenge from '../OwnChallenge';
import { addChallenge } from '../../actions/user';

export class AddChallenge extends React.Component {
  state = {
    flipped: false
  }

  flipCard = () => {
    this.setState(state => ({ flipped: !state.flipped }));
  }

  onSubmit = (data) => {
    this.props.dispatch(addChallenge(data));
  }
  
  render() {
    return (
      <div className='addChallengeCard'>
        <FlipCard flipped={this.state.flipped}>
          <div className='addChallengeCard__front'>
            <div className='addChallengeCard__type'>
              <h4>Default</h4>
              <span>
                <h4 className='other'>Own</h4>
                <Icon name='arrow circle right' size='large' aria-label='own challenges' onClick={this.flipCard} tabIndex='0' />
              </span> 
            </div>
            <SelectChallenge 
              challengeList={this.props.challengeList}
              onSubmit={this.onSubmit} 
            />
          </div>
          <div className='addChallengeCard__back'>
            <div className='addChallengeCard__type'>
              <span>
                <Icon name='arrow circle left' size='large' aria-label='default challenges' onClick={this.flipCard} tabIndex='0' />
                <h4 className='other'>Default</h4>
              </span>
              <h4>Own</h4>
            </div>
            <OwnChallenge onSubmit={this.onSubmit} />
          </div>
        </FlipCard>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  challengeList: state.global.challengeList
});

export default connect(mapStateToProps)(AddChallenge);
