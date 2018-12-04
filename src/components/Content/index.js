import React, { Component } from 'react';
import Leaderboard from '../Leaderboard';
import Friend from '../Friend';
import Challenges from '../Challenges';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  render() {
    return (
      <div>
        {
        (() => {
          switch(this.props.current) {
            case 'Leaderboard':
              return <Leaderboard />;
            case `Friend's List`:
              return <Friend />
            default: 
              return <Challenges />
          }
        })()
        }
      </div>
    )
  }
}