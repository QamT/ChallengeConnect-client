import React from 'react';
import { string, shape } from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import LocationPicker from './LocationPicker';
import { registerUserDetails } from '../../actions/user';

export class Profile extends React.Component {
  static propTypes = {
    user: string,
    name: string,
    profile: string,
    location: shape({
      city: string,
      state: string,
      country: string
    }),
    gender: string,
    about: string
  }

  state = {
    file: null,
    fileContent: null,
    gender: null,
    birthDate: this.props.birthDate,
    location: this.props.location,
    about: this.props.about,
    success: false,
    error: null
  }

  componentDidMount() {
    document.title = 'Customize your profile';
  }

  onSubmit = e => {
    e.preventDefault();
    const { file } = this.state;
    const optionalDetails = ['gender', 'birthDate', 'location', 'about'];
    const userDetails = {};

    for (const detail of optionalDetails) {
      if (detail === 'location' && !this.state[detail].country) continue;
      if (this.state[detail]) userDetails[detail] = this.state[detail];
    }
    if (Object.keys(userDetails).length === 0 && !file) return;
   
    this.props.dispatch(registerUserDetails(userDetails, file));
  }

  onFileChange = e => {
    e.preventDefault();
    const file = this.fileInput.files[0] || e.dataTransfer.files[0];
    const { error } = this.state;
   
    if (!file) return;
    if (!/^.*\.(jpg|jpeg|png)$/.test(file.name)) return this.setState({ error: 'File must be an image' });
    if (error) this.setState({ error: null });
  
    this.readFileContents(file);
    this.setState({ file });
  }

  readFileContents = file => {
    const { fileContent } = this.state;
    if (fileContent) URL.revokeObjectURL(fileContent);
    this.setState({ fileContent: URL.createObjectURL(file) });
  }

  onGenderChange = e => {
    this.setState({ gender: e.target.value });
  }

  onDateChange = birthDate => {
    if (birthDate > new Date()) return this.setState({ birthDate: null })
    this.setState({ birthDate });
  }

  onLocationChange = (key, value) => {
    const { location: prev } = this.state;
    const location = { ...prev, [key]: value }
    this.setState({ location });
  }

  onAboutChange = e => {
    this.setState({ about: e.target.value })
  }

  preventDefault = e => {
    e.preventDefault();
  }

  componentDidUpdate(...args) {
    const { location } = this.state;
    const checkFields = ['birthDate', 'location', 'about']

    if (args[1].location.country !== this.state.location.country && args[1].location.country) {
      location.state = null;
      location.city = null;
      this.setState({ location });
    }
    for (const field of checkFields) {
      if (args[0][field] !== this.props[field]) this.setState({ [field]: this.props[field] });
    }
    if (JSON.stringify(args[0]) !== JSON.stringify(this.props)) this.setState({ success: true });
  }

  render () {
    const { file, fileContent, birthDate, location, about, success, error } = this.state;
    const { name, profile, user } = this.props;
    
    if (!user) return <Redirect to='/login' />

    return (
      <>
        <header className='header' role='banner'>
          <Link to='/'>ChallengeConnect</Link>
        </header>
        <main 
          className='profilePage' 
          role='main' 
          onDragEnter={this.preventDefault} 
          onDragLeave={this.preventDefault} 
          onDragOver={this.preventDefault} 
          onDrop={this.preventDefault}
        >
          <div className='container'>
            <div className='details'>
              <div className='details__left container' onDrop={this.onFileChange}>
                {error && <span className='details__error'>{error}</span>}
                <span className='screenreader-only' aria-live='polite'>{error}</span>
                <div>
                  <div>
                    {fileContent ? 
                      <>
                        <img src={fileContent} alt={file.name} height='100' width='100' />
                        <Icon name='check circle' />
                      </> :
                      profile ? <img src={profile} alt={`${name} profile`} height='100' width='100' /> :
                      <Icon name='user circle' size='large' />
                    }
                  </div>
                  <input
                    type='file'
                    id='profile'
                    name='profile'
                    onChange={this.onFileChange}
                    accept='.jpg, .png' 
                    ref={input => this.fileInput = input}
                  />
                  <label htmlFor='profile'>Upload picture</label>
                </div>
              </div>
              <div className='details__right'>
                <h3>About You</h3>
                <form onSubmit={this.onSubmit}>
                  <div>
                    <fieldset>
                      <span><legend>Gender</legend></span>
                      <span>
                        <input type='radio' onChange={this.onGenderChange} id='male' name='gender' value='male'/>
                        <label htmlFor='male'><Icon name='man' circular /><span>Male</span></label>
                      </span>
                      <span>
                        <input type='radio' onChange={this.onGenderChange} id='female' name='gender' value='female'/>
                        <label htmlFor='female'><Icon name='woman' circular /><span>Female</span></label>
                      </span>
                    </fieldset>
                  </div>
                  <div>
                    <DatePicker 
                      selected={birthDate} 
                      onChange={this.onDateChange} 
                      maxDate={new Date()}
                      id='date' 
                      name='date' 
                      autoComplete='off'
                    />
                    <label className={birthDate ? 'valid' : ''} htmlFor='date'>Date of Birth</label>
                    <Icon name ='calendar alternate outline' />
                  </div>
                  <div className='details__right-location'>
                    <LocationPicker location={location} setlocation={this.onLocationChange} />
                  </div>
                  <div>
                    <textarea type='text' onChange={this.onAboutChange} id='about' name='about' maxLength={200} rows={4} value={about}/>
                    <label htmlFor='about' className={about ? 'valid' : ''}>About</label>
                  </div>
                  <div className='details__actions'>
                    <button type='submit'>Save</button>
                    <Link to='/challenge'>{success || name ? 'Done' : 'Skip'}</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.currentUser,
  name: state.user.firstName,
  profile: state.user.profilePic.url,
  location: state.user.location,
  gender: state.user.gender,
  about: state.user.about,
  birthDate: state.user.birthDate ? new Date(state.user.birthDate) : null
});

export default connect(mapStateToProps)(Profile);

