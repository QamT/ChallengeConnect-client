import React from 'react';
import { shape, string, arrayOf, object, instanceOf, func, bool } from 'prop-types';
import { Icon } from 'semantic-ui-react';

import Profile from '../../../Profile';

const SearchResults = ({ 
  results = [],
  acceptFriendRequest, 
  sendFriendRequest, 
  input, 
  friends = [], 
  friendRequests = [], 
  friendRequested = [], 
  loading 
}) => {
  return (
    <div className='search__results'>
      <ul>
        {results.length > 0 &&
          results.map(result => (
            <li key={result.id}>
              <span>
                <Profile user={result} side='right' /> 
                <span className='name'>{result.firstName} {result.lastName}</span>
              </span>
              <span className='search__results-actions'>
                {
                  friends.find(friend => result.id === friend._id) ? <Icon name='user outline' title='friend' /> :
                  friendRequested.find(person=> person._id === result.id) ? <Icon name='user' title='friend request sent' /> :
                  friendRequests.find(person => person._id === result.id) ? 
                  <Icon 
                    name='add user' 
                    title='accept friend request' 
                    aria-label='accept friend request'
                    tabIndex='0' 
                    onClick={e => acceptFriendRequest(e, result.id)} 
                    onKeyDown={e => acceptFriendRequest(e, result.id)} 
                  /> :
                  <Icon 
                    name='add user' 
                    title='send friend request' 
                    aria-label='send friend request'
                    tabIndex='0' 
                    onClick={e => sendFriendRequest(e, result.id)}
                    onKeyDown={e => sendFriendRequest(e, result.id)}  
                  /> 
                }
              </span>
            </li>
            )
          )
        }
        {results.length === 0 && input && input.value.length > 0 && !loading && <li>No results found</li>}
      </ul>
    </div>
  )
}

SearchResults.propTypes = {
  results: arrayOf(shape({
    id: string.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
    profilePic: object,
    currentChallenge: object,
    about: string
  })),
  acceptFriendRequest: func.isRequired,
  sendFriendRequest: func.isRequired,
  input: instanceOf(Element),
  friends: arrayOf(object),
  friendRequests: arrayOf(object),
  friendRequested: arrayOf(object),
  loading: bool.isRequired
}

export default SearchResults;

