import * as Yup from 'yup';

export default Yup.object().shape({
  username: Yup.string()
    .min('6', 'Username must contain at least 6 characters')
    .matches(/^[a-zA-Z0-9.]+$/, 'Username can only contain alphanumeric characters and no spaces')
    .strict().trim('Username cannot start or end with whitespace')
    .required('Username is required'),
  password: Yup.string()
    .min('6', 'Password must contain at least 6 characters')
    .matches(/^[a-zA-Z0-9.]+$/, 'Password can only contain alphanumeric characters and no spaces')
    .strict().trim('Password cannot start or end with whitespace')
    .required('Password is required'),
  firstName: Yup.string()
    .matches(/^[a-zA-z]+$/, 'First name can only contain letters')
    .trim().required('First name is required'),
  lastName: Yup.string()
    .matches(/^[a-zA-z]+$/, 'Last name can only contain letters')
    .trim().required('Last name is required')
});





