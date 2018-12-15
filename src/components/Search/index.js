import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { Icon } from 'semantic-ui-react';

import Profile from '../Profile';
import { fetchResults, clearResult } from '../../actions/global';
import { sendFriendRequest, acceptFriendRequest } from '../../actions/user';

export class Search extends React.Component {
  handleSearch = () => {
    let name = this.input.value.split(' ');
    let value;

    if (!(/^[a-z A-Z]+$/.test(name[0]))) {
      this.props.dispatch(clearResult());
      return;
    } else if (name.length > 1) {
      value = `${name[0]}+${name[1]}`;
    } else {
      value = name[0];
    }

    this.props.dispatch(fetchResults(value));
  }

  sendFriendRequest = (e, userId) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.dispatch(sendFriendRequest(userId));
    }
  }

  acceptFriendRequest = (e, userId) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.dispatch(acceptFriendRequest(userId));
    }
  }

  clearInput = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.input.value = '';
      this.props.dispatch(clearResult());
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearResult());
  }

  render() {
    const { results, friends, friendRequests, friendRequested, loading} = this.props;

    return (
      <div className='search'>
        <div className='search__bar'>
          <input 
            onChange = {this.handleSearch}
            type='text' 
            aria-label='search for friends' 
            placeholder='Search for friends'
            autoComplete='off'
            ref = {input => this.input = input}
          />
          {this.input && this.input.value !== '' ? 
            <Icon 
              name='remove circle' 
              aria-label='clear input' 
              tabIndex='0' 
              onClick={this.clearInput} 
              onKeyDown={this.clearInput} 
            /> : 
            <Icon name='search' /> 
          }
        </div>
        <div className='search__results'>
          <ul>
            {results.length > 0 &&
              results.map(result => 
                <li key={uuid()}>
                  <span>
                    <Profile user={result} /> 
                    <span className='name'>{result.firstName} {result.lastName}</span>
                  </span>
                  <span 
                    className='search__results-add'>
                    {
                      friends.find(friend => result.id === friend) ? <Icon name='user outline' title='friend' /> :
                      friendRequested.find(person=> person.id === result.id) ? <Icon name='user' title='friend request sent' /> :
                      friendRequests.find(person => person.id === result.id) ? 
                      <Icon 
                        name='add user' 
                        title='accept friend request' 
                        tabIndex='0' 
                        onClick={e => this.acceptFriendRequest(e, result.id)} 
                        onKeyDown={e => this.acceptFriendRequest(e, result.id)} 
                      /> :
                      <Icon 
                        name='add user' 
                        title='send friend request' 
                        tabIndex='0' 
                        onClick={e => this.sendFriendRequest(e, result.id)}
                        onKeyDown={e => this.sendFriendRequest(e, result.id)}  
                      /> 
                    }
                  </span>
                </li>
              )
            }
            {results.length === 0 && this.input && this.input.value.length > 0 && !loading && <li>No results found</li>}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.global.searchLoading,
  results: state.global.searchUsers.filter(result => result.id !== state.user.userId),
  friends: state.user.friends,
  friendRequests: state.user.friendRequests,
  friendRequested: state.user.friendRequested
});

export default connect(mapStateToProps)(Search);
