import React from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from './Header';
import Navbar from './Navbar';
import Content from './Content';
import Loader from '../Loader';
import { fetchUserInfo, refreshUserInfo } from '../../actions/user';
import { logout, refreshAuthToken } from '../../actions/auth';

export class Challenge extends React.Component {
  static propTypes = {
    loading: bool.isRequired,
    hasAuthToken: bool.isRequired
  }

  state = {
    prevSection: '',
    section: 'Status',
    sections: ['Leaderboard', 'Status', `Friend's List`]
  }

  componentDidMount() {
    document.title = 'ChallengeConnect Overview';
    this.props.fetchUserInfo();
    this.refreshUserInfo();
  }

  changeSection = (e, section) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.setState({ prevSection: this.state.section });
      this.setState({ section });
    }
  }

  refreshUserInfo() {
    this.refreshInterval = setInterval(() => this.props.refreshUserInfo(), 1000 * 60);
    this.refreshToken = setInterval(() => this.props.refreshAuthToken(), 1000 * 60 * 60);
  }

  logout = e => {
    if (e.key === 'Enter' || e.type === 'click') this.props.logout();
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
    clearInterval(this.refreshToken);
  }

  render() {
    if (!this.props.hasAuthToken) return <Redirect to ='/' />
    const { prevSection, section, sections } = this.state;
 
    return (
      <div className='challenge'>
        <Header logout={this.logout} />
        <Navbar 
          prevSection={prevSection}
          section={section} 
          sections={sections} 
          changeSection={this.changeSection} 
        />
        {this.props.loading ? <Loader /> : <Content current={section} prev={prevSection} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.user.loading,
  hasAuthToken: state.auth.authToken !== null
});

const actionCreators = {
  fetchUserInfo,
  refreshUserInfo,
  logout,
  refreshAuthToken
};

export default connect(mapStateToProps, actionCreators)(Challenge);




