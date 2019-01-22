import React from 'react';
import { shallow } from 'enzyme';

import Profile from '../../../components/Profile';

describe('Profile', () => {

  it('should render without fail', () => {
    const user = {
      firstName: 'test',
      lastName: 'test',
      profilePic: { url: '' },
      currentChallenge: {},
      about: ''
    };
    shallow(<Profile user={user} />);
  });
})