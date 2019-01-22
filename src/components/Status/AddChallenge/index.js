import React from 'react';
import { arrayOf, string } from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import FlipCard from './FlipCard';
import SelectChallenge from './SelectChallenge';
import OwnChallenge from './OwnChallenge';
import { addChallenge } from '../../../actions/user';

export class AddChallenge extends React.Component {
  static propTypes = {
    challengeList: arrayOf(string).isRequired
  }

  state = {
    flipped: false,
    error: null
  }

  flipCard = e => {
    if (e.key === 'Enter' || e.type === 'click') this.setState(prevState => ({ flipped: !prevState.flipped }));
  }

  onSubmit = challenge => {
    this.props.dispatch(addChallenge(challenge));
  }

  onError = error => {
    this.setState({ error });
  }
  
  render() {
    const { flipped, error } = this.state;
   
    return (
      <div className='addChallengeCard'>
        <FlipCard flipped={flipped}>
          <div className='addChallengeCard__front'>
            <div className='addChallengeCard__type'>
              <h4>Default</h4>
              <span>
                <h4 className='other'>Own</h4>
                <Icon 
                  name='arrow circle right' 
                  size='large' 
                  title='own challenges'
                  aria-label='own challenges' 
                  onClick={this.flipCard} 
                  onKeyDown={this.flipCard}
                  tabIndex={flipped ? '-1' : '0'} 
                />
              </span> 
            </div>
            <SelectChallenge 
              challengeList={this.props.challengeList}
              addChallenge={this.onSubmit} 
              flipped={flipped}
              error={error}
              onError={this.onError}
            />
          </div>
          <div className='addChallengeCard__back'>
            <div className='addChallengeCard__type'>
              <span>
                <Icon 
                  name='arrow circle left' 
                  size='large' 
                  title='default challenges'
                  aria-label='default challenges' 
                  onClick={this.flipCard} 
                  onKeyDown={this.flipCard}
                  tabIndex={flipped ? '0' : '-1'} 
                />
                <h4 className='other'>Default</h4>
              </span>
              <h4>Own</h4>
            </div>
            <OwnChallenge addChallenge={this.onSubmit} flipped={flipped} />
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


