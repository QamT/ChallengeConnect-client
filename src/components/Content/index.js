import React, { Component } from 'react';
import Leaderboard from '../Leaderboard';
import FriendList from '../FriendList';
import Challenges from '../Challenges';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.state = {
      loading: false
    }
  }

  componentWillMount() {
    this.load();
  }

  load() {
    this.setState({ loading: true });
    setTimeout(() => { //change to fetch data
      this.setState({ loading: false })
    }, 1200);
  }

  render() {
    return (
      <div>
        {this.state.loading ? <p>Loading...</p> : 
        (() => {
          switch(this.props.current) {
            case 'Leaderboard':
              return <Leaderboard />;
            case `Friend's List`:
              return <FriendList />
            default: 
              return <Challenges />
          }
        })()}
      </div>
    )
  }
}