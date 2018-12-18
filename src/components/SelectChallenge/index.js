import React from 'react';
import uuid from 'uuid/v4';
import { Icon } from 'semantic-ui-react';

export default class SelectChallenge extends React.Component {
  state = {
    error: null
  }

  onSubmit = (e) => {
    this.setState({ error: null });
    e.preventDefault();
    const challenges = this.selectInput.map(input => input.value);

    let error = '';
    if (challenges.find((challenge, i) => challenge === challenges[i+1])) error = 'Challenges must be unique';
    this.setState({ error });

    if (!error) this.props.onSubmit({ title: this.input.value, challenges });
  }

  render() {
    const { challengeList} = this.props;
    this.selectInput = [];

    const challengeOptions = challengeList.map(challenge => (
      <option key={uuid()} value={challenge}>{challenge}</option>
    ));
    const optionSelect = <option value='' hidden>Select Challenge</option>;

    const selectInputs = [0,1,2,3,4].map(i => (
      <div key={uuid()}>
        <select
          aria-label='challenge options' 
          name={`challenge${i + 1}`}
          ref={input => this.selectInput[i] = input}
          required
        >
          {optionSelect}
          {challengeOptions}
        </select>
        <Icon name='angle down' />
      </div>
    ));

    return (
      <>
        {this.state.error && <span className='addChallengeCard__error'>{this.state.error}</span>}
        <form onSubmit={this.onSubmit}>
          <fieldset> 
            <legend>New Challenge</legend>
            <div>
              <input 
                type='text'
                name='title'
                aria-label='title' 
                ref={input => this.input = input}
                maxLength='20'
                placeholder='Title'
                autoComplete='off'
                required
              /> 
            </div>
            {selectInputs}
          </fieldset>
          <button className='btn-add' type='submit'>Add Challenge</button>
        </form>
      </>
    )
  }
}

