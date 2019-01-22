import React from 'react';
import { string } from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { registerUser, clearUserError } from '../../actions/user';
import validationSchema from '../../validator';

export class Register extends React.Component {
  static propTypes = {
    user: string,
    error: string
  }

  state = {
    success: false
  }

  componentDidMount() {
    document.title = 'Register for ChallengeConnect';
  }

  onSubmit = (values, { setSubmitting }) => {
    const { username, password, firstName, lastName } = values
    const { dispatch } = this.props;

    dispatch(registerUser({ username, password, firstName, lastName }));
    setSubmitting(false);
  }

  componentDidUpdate(prevProps, prevState) {
    const { user } = this.props;
    if (user !== prevProps.user && user) this.setState({ success: true });
  }

  componentWillUnmount() {
    this.props.dispatch(clearUserError())
  }

  render () {
    const { error } = this.props;

    if (this.state.success) return <Redirect to='/profile' />;
    
    return (
      <>
        <header className='header' role='banner'>
          <Link to='/'>ChallengeConnect</Link>
        </header>
        <main className='register' role='main'>
          <div className='myForm myForm--register'>
            <Formik
              initialValues={{
                username: '',
                password: '',
                firstName: '',
                lastName: ''
              }}
              validationSchema={validationSchema}
              onSubmit={this.onSubmit}
              render={formProps => {
                const { errors, touched } = formProps;

                return (
                  <Form>
                    {error && <span className='myForm__error'>{error}</span>}
                    <span className='screenreader-only' aria-live='polite'>{error}</span>
                    <div className='myForm__type'>
                      <span>Register</span>
                      <Link to='/login'>Login</Link>
                    </div>
                    <div className='myForm__input'>
                      <label htmlFor='firstName'>First Name</label>
                      <Field
                        type='text'
                        id='firstName'
                        name='firstName'
                        placeholder='First Name'
                        maxLength='36'
                        autoComplete='off'
                        className={errors.firstName && touched.firstName ? 'error' : ''}
                      />
                      <ErrorMessage className='myForm__error--register' name='firstName' component='span' />
                      <span className='screenreader-only' aria-live='polite'><ErrorMessage name='firstName'/></span>
                    </div>
                    <div className='myForm__input'>
                      <label htmlFor='lastName'>Last Name</label>
                      <Field
                        type='text'
                        id='lastName'
                        name='lastName'
                        placeholder='Last Name'
                        maxLength='36'
                        autoComplete='off'
                        className={errors.lastName && touched.lastName ? 'error' : ''}
                      />
                      <ErrorMessage className='myForm__error--register' name='lastName' component='span' />
                      <span className='screenreader-only' aria-live='polite'><ErrorMessage name='lastName'/></span>
                    </div>
                    <div className='myForm__input'>
                      <label htmlFor='username'>Username</label>
                      <Field
                        type='text'
                        id='username'
                        name='username'
                        placeholder='At least 6 characters'
                        maxLength='36'
                        autoComplete='off'
                        className={errors.username && touched.username ? 'error' : ''}
                      />
                      <ErrorMessage className='myForm__error--register' name='username' component='span' />
                      <span className='screenreader-only' aria-live='polite'><ErrorMessage name='username'/></span>
                    </div>
                    <div className='myForm__input'>
                      <label htmlFor='password'>Password</label>
                      <Field
                        type='password'
                        id='password'
                        name='password'
                        placeholder='At least 6 characters'
                        maxLength='36'
                        autoComplete='off'
                        className={errors.password && touched.password ? 'error' : ''}
                      />
                      <ErrorMessage className='myForm__error--register' name='password' component='span' />
                      <span className='screenreader-only' aria-live='polite'><ErrorMessage name='password'/></span>
                    </div>
                    <button 
                      type='submit'
                      className='btn-login'
                      disabled={formProps.isSubmitting}
                    >
                      Register
                    </button>
                  </Form>
              )}}
            />
          </div>
        </main>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.currentUser,
  error: state.user.error
});

export default connect(mapStateToProps)(Register);
