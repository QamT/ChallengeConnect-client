import React from 'react';
import uuid from 'uuid/v4';

export default class SelectChallenge extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    const challenges = this.textInput.map(input => input.value);
    this.props.onSubmit({ title: this.input.value, challenges });
  }

  render() {
    this.textInput = [];

    const ownInputs = [1,2,3,4,5].map(i => (
      <div key={uuid()}>
        <input 
          type='text' 
          name={`challenge${i}`}
          aria-label={`challenge${i}`}
          ref={input => this.textInput[i-1] = input}
          maxLength='20'
          placeholder={`Challenge ${i}`}
          autoComplete='off'
          required
        />
      </div>
    ));

    return (
      <>
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
            {ownInputs}
          </fieldset>
          <button className='btn-add' type='submit'>Add Challenge</button>
        </form>
      </>
    )
  }
}
