import React from 'react';
import { shallow } from 'enzyme';

import Friend from '../../../components/Friend';

describe('Friend', () => {

  it('should render without fail', () => {
    shallow(<Friend />);
  });
})