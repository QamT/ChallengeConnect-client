import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  document.title = 'ChallengeConnect Homepage';

  return (
    <div className='home'>
      <header>
        <div className='container'>
          <h1>ChallengeConnect</h1>
          <Link to='/login'>Login</Link>
        </div>
      </header>
      <main className='hero'>
        <div className='container'>
          <div className='hero__left'>
            <h2>Connect with Friends and Compete in Bouts of Challenges</h2>
            <p>
              Join a team or create your own. 
              Complete challenges and earn points to rise up on the leaderboard. 
              Send your friends a request to join your challenge. 
              Socialize with other players in the global chat.
            </p>
            <Link to='/register'>Sign Up</Link>
            <Link to='/login'>Demo Profile</Link>
          </div>
          <div className='hero__right'>
            <div className='hero__right-overlay'>
              <img 
                src='https://res.cloudinary.com/qamnodeapp/image/upload/v1549407510/reactapp/Screen_Shot_2019-02-05_at_4.37.49_PM.png'
                height='273'
                width='426'
                alt='challenge connect main page' 
              />
            </div>
          </div>
        </div>
      </main>
      <footer>Made by Qamar</footer>
    </div>
  )
}

export default Home;
