import React from 'react';
import { bool, arrayOf, object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'semantic-ui-react';

import SearchResults from './SearchResults';
import { fetchResults, clearResults } from '../../../actions/global';
import { sendFriendRequest, acceptFriendRequest } from '../../../actions/user';

export class Search extends React.Component {
  static propTypes = {
    loading: bool.isRequired,
    results: arrayOf(object),
    friends: arrayOf(object),
    friendRequests: arrayOf(object),
    friendRequested: arrayOf(object)
  }

  handleSearch = () => {
    const name = this.input.value.split(' ');
    let value, blank = true;
    if (name.length > 2) blank = name.slice(2).every(value => value === '');
 
    if (!(/^[a-z A-Z]+$/.test(name[0])) || !blank) return this.props.clearResults();
    
    value = name.length > 1 ? `${name[0]}+${name[1]}` : name[0];
    this.props.fetchResults(value);
  }

  sendFriendRequest = (e, userId) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.sendFriendRequest(userId);
    }
  }

  acceptFriendRequest = (e, userId) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.acceptFriendRequest(userId);
    }
  }

  clearInput = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.input.value = '';
      this.props.clearResults();
    }
  }

  componentWillUnmount() {
    this.props.clearResults();
  }

  render() {
    const { results, friends, friendRequests, friendRequested, loading } = this.props;
   
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
        <SearchResults 
          results={results}
          acceptFriendRequest={this.acceptFriendRequest}
          sendFriendRequest={this.sendFriendRequest}
          input={this.input}
          friends={friends}
          friendRequests={friendRequests}
          friendRequested={friendRequested}
          loading={loading}
        />
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

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchResults,
    clearResults,
    sendFriendRequest,
    acceptFriendRequest
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
