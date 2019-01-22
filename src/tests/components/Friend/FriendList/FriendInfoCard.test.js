import React from 'react';
import { shallow } from 'enzyme';

import FriendInfoCard from '../../../../components/Friend/FriendList/FriendInfoCard';

describe('FriendInfoCard', () => {

  it('should render without fail', () => {
    shallow(<FriendInfoCard />)
  });

});