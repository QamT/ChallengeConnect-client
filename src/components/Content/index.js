import React, { Component } from 'react';
import Leaderboard from '../Leaderboard';
import Friend from '../Friend';
import Challenges from '../Challenges';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    this.load();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.props.current) {
      this.setState({ isLoading: true })
      this.load();
    }
  }

  load() {
    setTimeout(() => { //change to fetch data
      this.setState({ isLoading: false })
    }, 1200);
  }

  render() {
    return (
      <div>
        {this.state.isLoading ? <p>Loading...</p> : 
        (() => {
          switch(this.props.current) {
            case 'Leaderboard':
              return <Leaderboard />;
            case `Friend's List`:
              return <Friend />
            default: 
              return <Challenges />
          }
        })()}
      </div>
    )
  }
}