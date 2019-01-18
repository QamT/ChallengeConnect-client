import React from 'react';
import { bool, func } from 'prop-types';

const OwnChallenge = ({ addChallenge, flipped }) => {
  let textInput = [], titleInput = null;

  const onSubmit = e => {
    e.preventDefault();
    const challenges = textInput.map(input => input.value);
    addChallenge({ title: titleInput.value, challenges });
  };

  const ownInputs = [1,2,3,4,5].map(i => (
    <div key={`own${i}`}>
      <input 
        type='text' 
        name={`challenge${i}`}
        aria-label={`challenge${i}`}
        ref={input => textInput[i-1] = input}
        maxLength='35'
        placeholder={`Challenge ${i}`}
        autoComplete='off'
        required
        disabled={!flipped}
      />
    </div>
  ));

  return (
    <>
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
              disabled={!flipped}
            />
          </div>
          {ownInputs}
        </fieldset>
        <button className='btn-add' type='submit' aria-label='add challenge' disabled={!flipped}>Add Challenge</button>
      </form>
    </>
  )
}

OwnChallenge.propTypes = {
  addChallenge: func.isRequired,
  flipped: bool.isRequired
}

export default OwnChallenge;


