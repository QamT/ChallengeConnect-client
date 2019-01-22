import React from 'react';
import { shallow } from 'enzyme';

import Chatbox from '../../../components/Chat/Chatbox';

describe('Chatbox', () => {

  it('should render without fail', () => {
    shallow(<Chatbox messages={[]} />);
  });
})