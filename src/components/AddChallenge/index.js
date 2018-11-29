import React from 'react';

export default () => (
  <div className='challengeCard'>
    <div className='challengeCard__container'>
      <form>
        <h3>Challenges</h3>
        <div>
          <select id='challenges' name='selectChallenge1'>
            <option value=''>--Select Challenge--</option>
            <option value='feed homeless'>Feed Homeless person</option>
            <option value='100 pushups'>100 Pushups</option>
            <option value='read a book'>Read a Book</option>
            <option value='make spaghetti'>Make Spaghetti</option>
            <option value='volunteer'>Volunteer somewhere</option>
          </select>
          <input type='text' name='ownChallenge1' placeholder='Add Own Challenge' />
        </div>
        <div>
          <select id='challenges' name='selectChallenge2'>
            <option value=''>--Select Challenge--</option>
            <option value='feed homeless'>Feed Homeless person</option>
            <option value='100 pushups'>100 Pushups</option>
            <option value='read a book'>Read a Book</option>
            <option value='make spaghetti'>Make Spaghetti</option>
            <option value='volunteer'>Volunteer somewhere</option>
          </select>
          <input type='text' name='ownChallenge2' placeholder='Add Own Challenge' />
        </div>
        <div>
          <select id='challenges' name='selectChallenge3'>
            <option value=''>--Select Challenge--</option>
            <option value='feed homeless'>Feed Homeless person</option>
            <option value='100 pushups'>100 Pushups</option>
            <option value='read a book'>Read a Book</option>
            <option value='make spaghetti'>Make Spaghetti</option>
            <option value='volunteer'>Volunteer somewhere</option>
          </select>
          <input type='text' name='ownChallenge3' placeholder='Add Own Challenge' />
        </div>
        <div>
          <select id='challenges' name='selectChallenge4'>
            <option value=''>--Select Challenge--</option>
            <option value='feed homeless'>Feed Homeless person</option>
            <option value='100 pushups'>100 Pushups</option>
            <option value='read a book'>Read a Book</option>
            <option value='make spaghetti'>Make Spaghetti</option>
            <option value='volunteer'>Volunteer somewhere</option>
          </select>
          <input type='text' name='ownChallenge4' placeholder='Add Own Challenge' />
        </div>
        <div>
          <select id='challenges' name='selectChallenge5'>
            <option value=''>--Select Challenge--</option>
            <option value='feed homeless'>Feed Homeless person</option>
            <option value='100 pushups'>100 Pushups</option>
            <option value='read a book'>Read a Book</option>
            <option value='make spaghetti'>Make Spaghetti</option>
            <option value='volunteer'>Volunteer somewhere</option>
          </select>
          <input type='text' name='ownChallenge5' placeholder='Add Own Challenge' />
        </div>
        <button type='submit'>Add Challenge</button>
      </form>
    </div>
  </div>
)