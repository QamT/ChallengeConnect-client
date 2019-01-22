import React from 'react';
import { shallow } from 'enzyme';

import { Leaderboard } from '../../../components/Leaderboard';

describe('Leaderboard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Leaderboard loading={false} dispatch={jest.fn()} />);
  });

  it('should render without fail', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render LeaderCard component', () => {
    expect(wrapper.find('div > LeaderCard').exists()).toBeTruthy();
  });
})