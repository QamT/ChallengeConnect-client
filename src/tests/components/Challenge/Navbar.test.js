import React from 'react';
import { mount } from 'enzyme';

import Navbar from '../../../components/Challenge/Navbar';

describe('Navbar', () => {
  let wrapper;
  const spy = jest.fn();

  beforeEach(() => {
    const props = { 
      prevSection: '',
      section: 'Status',
      sections: ['Leaderboard', 'Status', `Friend's List`],
      changeSection: spy
    };
    wrapper = mount(<Navbar {...props} />);
    spy.mockClear();
  });

  it('should render li equal to the amount of sections', () => {
    const sections = wrapper.props().sections.length;
    expect(wrapper.find('li').length).toEqual(sections);
  });

  it('should call changeSection when section clicked', () => {
    const section1 = wrapper.find('ul').find('li').at(0);
    section1.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
})
