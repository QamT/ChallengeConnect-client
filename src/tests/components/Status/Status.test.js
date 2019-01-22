import React from 'react';
import { shallow } from 'enzyme';

import { Status } from '../../../components/Status';

describe('Status', () => {

  it('should render without fail', () => {
    shallow(<Status />);
  });
})