import React from 'react';
import { bool, string } from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';

import { login, clearAuthError } from '../../actions/auth';

export class Login extends React.Component {
  static propTypes = {
    loggedIn: bool.isRequired,
    error: string
  }

  componentDidMount() {
    document.title = 'Login to ChallengeConnect';
  }

  onSubmit = (values, { setSubmitting }) => {
    this.props.dispatch(login(values.username, values.password));
    setSubmitting(false);
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthError());
  }
 
  render() {
    const { error, loggedIn } = this.props;
  
    if (loggedIn) return <Redirect to ='/challenge' />;
    return (
      <>
        <header className='header' role='banner'>
          <Link to='/'>ChallengeConnect</Link>
        </header>
        <main className='login' role='main'>
          <div className='myForm'>
            <Formik
              initialValues={{
                username: '',
                password: ''
              }}
              onSubmit={this.onSubmit}
              render={formProps => (
                <Form>
                  {error && <span className='myForm__error'>{error}</span>}
                  <span className='screenreader-only' aria-live='polite'>{error}</span>
                  <div className='myForm__type'>
                    <span>Login</span>
                    <Link to='/register'>Register</Link>
                  </div>
                  <div className='myForm__input'>
                    <label htmlFor='username'>Username</label>
                    <Field
                      type='text'
                      id='username'
                      name='username'
                      placeholder='Username'
                      maxLength='36'
                      autoComplete='off'
                      required
                    />
                  </div>
                  <div className='myForm__input'>
                    <label htmlFor='password'>Password</label>
                    <Field
                      type='password'
                      id='password'
                      name='password'
                      placeholder='Password'
                      maxLength='36'
                      autoComplete='off'
                      required
                    />
                  </div>
                  <button 
                    type='submit'
                    className='btn-login'
                    disabled={formProps.isSubmitting}
                  >
                    Login
                  </button>
                  <span className='demo'>Demo: <span>user123</span> | <span>password</span></span>
                </Form>
              )}
            />
          </div>
        </main>
      </>
    )
  }
}


const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  error: state.auth.error
});

export default connect(mapStateToProps)(Login);
