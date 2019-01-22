import React from 'react';
import { shallow } from 'enzyme';

import { FriendList } from '../../../../components/Friend/FriendList';

describe('FriendList', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FriendList friends={[]} />);
  });

  it('should render without fail', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render all parts', () => {
    expect(wrapper.find('.friendCard__count').exists()).toBeTruthy();
    expect(wrapper.find('.friendCard__container').exists()).toBeTruthy();
  });
})