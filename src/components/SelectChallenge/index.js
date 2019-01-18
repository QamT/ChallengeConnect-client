import React from 'react';
import { arrayOf, string, bool, func } from 'prop-types';
import { Icon } from 'semantic-ui-react';

const SelectChallenge = ({ challengeList, addChallenge, flipped, error = null, onError }) => {
  let selectInput = [], titleInput = null;

  const onSubmit = e => {
    e.preventDefault();
    if (error) onError(null);

    const challenges = selectInput.map(input => input.value);
    const unique = [...new Set(challenges)];
    if (unique.length < 5) return onError('Challenges must be unique');
   
    addChallenge({ title: titleInput.value, challenges });
  };

  const challengeOptions = challengeList.map(challenge => (
    <option key={challenge} value={challenge}>{challenge}</option>
  ));
  const optionSelect = <option value='' hidden>Select Challenge</option>;
  const selectInputs = [0,1,2,3,4].map(i => (
    <div key={`select${i}`}>
      <select
        aria-label='challenge options' 
        name={`challenge${i + 1}`}
        ref={input => selectInput[i] = input}
        required
        disabled={flipped}
      >
        {optionSelect}
        {challengeOptions}
      </select>
      <Icon name='angle down' />
    </div>
  ));

  return (
    <>
      {error && <span className='addChallengeCard__error'>{error}</span>}
      <form onSubmit={onSubmit}>
        <fieldset> 
          <legend>New Challenge</legend>
          <div>
            <input 
              type='text'
              name='title'
              aria-label='title' 
              ref={input => titleInput = input}
              maxLength='25'
              placeholder='Title'
              autoComplete='off'
              required
              disabled={flipped}
            /> 
          </div>
          {selectInputs}
        </fieldset>
        <button className='btn-add' type='submit' aria-label='add challenge' disabled={flipped}>Add Challenge</button>
      </form>
    </>
  )
}

SelectChallenge.propTypes = {
  challengeList: arrayOf(string).isRequired,
  addChallenge: func.isRequired,
  flipped: bool.isRequired,
  error: string,
  onError: func.isRequired
}

export default SelectChallenge;




