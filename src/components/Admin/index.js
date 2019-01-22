import React from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import AdminCard from '../AdminCard';
import { clearAdminError } from '../../actions/admin';

export class Admin extends React.Component {
  static propTypes = {
    error: string,
    teamId: string.isRequired
  }

  state = {
    displayInfo: false
  }

  displayInfo = e => {
    if (e.key === 'Enter' || e.type === 'click') this.setState(prevState => ({ displayInfo: !prevState.displayInfo }));
  }

  clearError = () => {
    setTimeout(() => {
      this.props.dispatch(clearAdminError());
    }, 2500);
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (prevProps.error !== error && error) this.clearError();
  }

  render() {
    const { error } = this.props
    
    return (
      <>
        {error && <span className='admin-error'>{error}</span>}
        <span className='screenreader-only'>{error}</span>
        <Icon 
          name='adn' 
          size='large' 
          onClick={this.displayInfo} 
          onKeyDown={this.displayInfo} 
          title='admin control'
          aria-label='admin control' 
          tabIndex='0' 
        />
        {this.state.displayInfo && <AdminCard />}
      </>
    )
  }
}
  
const mapStateToProps = state => ({
  error: state.admin.error,
  teamId: state.team.teamId,
});

export default connect(mapStateToProps)(Admin);
