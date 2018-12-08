import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import { fetchUsers, clearUser } from '../../actions/global';
import { sendFriendRequest } from '../../actions/user';

export class Search extends React.Component {
  
  handleSearch = () => {
    let name = this.input.value.split(' ');
    let value;

    if (!(/^[a-z A-Z]+$/.test(name[0]))) {
      this.props.dispatch(clearUser());
      return 
    } else if (name.length > 1) {
      value = `${name[0]}+${name[1]}`;
    } else {
      value = name[0];
    }

    this.props.dispatch(fetchUsers(value));
  }

  sendFriendRequest = (userId) => {
    this.props.dispatch(sendFriendRequest(userId));
  }

  render() {
    return (
      <div className='search'>
        <div>
          <input 
            onChange = {this.handleSearch}
            type='text' 
            name='user' 
            aria-label='search users' 
            ref = {input => this.input = input}
          />
        </div>
        <div>
          <ul>
            {this.props.loading && <li>Loading...</li>}
            {this.props.results.length > 0 &&
              this.props.results.map(result => 
                <li className='search__result' key={uuid()}>
                  {result.id !== this.props.userId &&
                    <>
                      <span>[P] {result.firstName} {result.lastName}</span>
                      <span 
                        className='search__result-add' 
                        onClick={() => this.sendFriendRequest(result.id)}
                        tabIndex='0'
                      >
                        +
                      </span>
                    </>
                  }
                </li>
              )
            }
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.global.searchLoading,
  userId: state.user.userId,
  results: state.global.searchUsers
});

export default connect(mapStateToProps)(Search);