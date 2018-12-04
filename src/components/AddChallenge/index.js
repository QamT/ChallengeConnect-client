import React from 'react';
import { connect } from 'react-redux';

import { addChallenge } from '../../actions/user';

export class AddChallenge extends React.Component {
  state = {
    filter: 'default'
  }

  onSubmit = (e) => {
    e.preventDefault();
    let challengeValues = [];
    if (this.state.filter === 'default') {
      challengeValues.push(this.selectInput1.value);
      challengeValues.push(this.selectInput2.value);
      challengeValues.push(this.selectInput3.value);
      challengeValues.push(this.selectInput4.value);
      challengeValues.push(this.selectInput5.value);
    } else {
      challengeValues.push(this.textInput1.value);
      challengeValues.push(this.textInput2.value);
      challengeValues.push(this.textInput3.value);
      challengeValues.push(this.textInput4.value);
      challengeValues.push(this.textInput5.value);
    }

    let data = {
      title: this.input.value,
      challenges: challengeValues
    }

    this.props.dispatch(addChallenge(data));
  }

  onClick = (filter) => {
    this.setState({ filter })
  }

  render() {
    const challengeOptions = this.props.challengeList.map((challenge, index) => (
      <option key={index} value={challenge}>{challenge}</option>
    ));

    const optionSelect = <option value='' hidden>---Select Challenge---</option>;

    return (
      <div className='challengeCard'>
        <div className='challengeCard__container challengeCard__container--add'>
          <ul>
            <li tabIndex='0' onClick={() => this.onClick('default')}>Default</li>
            <li tabIndex='0' onClick={() => this.onClick('own')}>Own</li>
          </ul>
          <form onSubmit={e => this.onSubmit(e)}>
            <fieldset> 
              <legend>New Challenge</legend>
              <div>
                <label htmlFor='title'>Title</label>
                <input 
                  type='text' 
                  id='title' 
                  name='title' 
                  ref={input => this.input = input}
                  placeholder='Title'
                  required
                />
              </div>
              {this.state.filter === 'default' ?
                <>
                  <div>
                    <select 
                      aria-label='challenge options' 
                      name='challenge1' 
                      ref={input => this.selectInput1 = input}
                      required
                    >
                      {optionSelect}
                      {challengeOptions}
                    </select>
                  </div>
                  <div>
                    <select 
                      aria-label='challenge options' 
                      name='challenge2'
                      ref={input => this.selectInput2 = input}
                      required
                    >
                      {optionSelect}
                      {challengeOptions}
                    </select>
                  </div>
                  <div>
                    <select 
                      aria-label='challenge options' 
                      name='challenge3'
                      ref={input => this.selectInput3 = input}
                      required
                    >
                      {optionSelect}
                      {challengeOptions}
                    </select>
                  </div>
                  <div>
                    <select 
                      aria-label='challenge options' 
                      name='challenge4'
                      ref={input => this.selectInput4 = input}
                      required
                    >
                      {optionSelect}
                      {challengeOptions}
                    </select>
                  </div>
                  <div>
                    <select 
                      aria-label='challenge options' 
                      name='challenge5'
                      ref={input => this.selectInput5 = input}
                      required
                    >
                      {optionSelect}
                      {challengeOptions}
                    </select>
                  </div>
                </> :
                <>
                  <div>
                    <label htmlFor='challenge1'>Challenge 1:</label>
                    <input 
                      type='text' 
                      id='challenge1' 
                      name='challenge1' 
                      ref={input => this.textInput1 = input}
                      placeholder='Challenge 1'
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor='challenge2'>Challenge 2:</label>
                    <input 
                      type='text' 
                      id='challenge2' 
                      name='challenge2' 
                      ref={input => this.textInput2 = input}
                      placeholder='Challenge 2'
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor='challenge3'>Challenge 3:</label>
                    <input 
                      type='text' 
                      id='challenge3' 
                      name='challenge3' 
                      ref={input => this.textInput3 = input}
                      placeholder='Challenge 3'
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor='challenge4'>Challenge 4:</label>
                    <input 
                      type='text' 
                      id='challenge4' 
                      name='challenge4' 
                      ref={input => this.textInput4= input}
                      placeholder='Challenge 4'
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor='challenge5'>Challenge 5:</label>
                    <input 
                      type='text' 
                      id='challenge5' 
                      name='challenge5' 
                      ref={input => this.textInput5 = input}
                      placeholder='Challenge 5'
                      required
                    />
                  </div>
                </>
              }
            </fieldset>
            <button type='submit'>Add Challenge</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  challengeList: state.global.challengeList
});

export default connect(mapStateToProps)(AddChallenge);