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

<<<<<<< HEAD
  render() {
    return (
      <div>
        {
=======
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
>>>>>>> 919878c6e821db29ca43cf89afb65ddb3329a6b0
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