import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, focus, reduxForm } from 'redux-form';

import { login } from '../../actions/auth';
import Input from '../../components/input';
import { nonEmpty, required } from '../../validator';

export class Login extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to ='/challenge' />
    }

    let error;
    if (this.props.error) {
      error = (
        <div aria-live='polite'>
          {this.props.error}
        </div> 
      )
    }

    return (
      <div>
        <main>
          <h1>Login</h1>
          <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
            {error}
            <div>
              <label htmlFor='username'>Username</label>
              <Field
                component={Input}
                type='text'
                name='username'
                id='username'
                validate={[required, nonEmpty]}
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <Field
                component={Input}
                type='password'
                name='password'
                id='password'
                validate={[required, nonEmpty]}
              />
            </div>
            <button
              disabled={this.props.pristine || this.props.submitting}
              type='submit'
            >
              Log In
            </button>
          </form>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(connect(mapStateToProps)(Login))