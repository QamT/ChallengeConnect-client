import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from '../Header';
import Navbar from '../Navbar';
import Content from '../Content';
import Loader from '../Loader';
import { fetchUserInfo, refreshUserInfo } from '../../actions/user';

export class Challenge extends React.Component {
 state = {
   section: 'Status',
   sections: ['Leaderboard', 'Status', `Friend's List`]
 }

 componentDidMount() {
  document.title = 'ChallengeConnect Overview';
  this.props.dispatch(fetchUserInfo());
  this.refreshUserInfo();
 }

 changeSection = (section) => {
   this.setState({ section });
 }

 refreshUserInfo() {
   this.refreshInterval = setInterval(() => this.props.dispatch(refreshUserInfo()), 1000 * 60)
 }

 componentWillUnmount() {
   clearInterval(this.refreshInterval);
 }

 render() {
    if (!this.props.auth) return <Redirect to ='/' />
   
    return (
      <div className='challenge'>
        <Header />
        <Navbar 
          section={this.state.section} 
          changeSection={this.changeSection} 
          sections={this.state.sections} 
        />
        {this.props.loading ? <Loader /> : <Content current={this.state.section} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  auth: state.auth.authToken
});

export default connect(mapStateToProps)(Challenge);

//refresh friends info as well
// -clean structure and names
// -transitions and animations
//responsiveness
// -best practices


