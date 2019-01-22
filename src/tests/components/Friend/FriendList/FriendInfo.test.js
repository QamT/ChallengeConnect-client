import React from 'react';
import { shallow } from 'enzyme';

import { FriendInfo } from '../../../../components/Friend/FriendList/FriendInfo';

describe('FriendInfo', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FriendInfo />);
  });

  it('should render without fail', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should display info card when icon clicked', () => {
    const event = { type: 'click' }
    expect(wrapper.find('FriendInfoCard').exists()).toBeFalsy();
    wrapper.instance().displayInfo(event);
    expect(wrapper.find('FriendInfoCard').exists()).toBeTruthy();
  });
})