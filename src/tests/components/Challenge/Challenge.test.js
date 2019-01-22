import React from 'react';
import { shallow } from 'enzyme';

import { Challenge } from '../../../components/Challenge';

describe('Challenge', () => {
  let wrapper;
  const spy = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Challenge loading={true} hasAuthToken={true} fetchUserInfo={spy} />);
    spy.mockClear();
  });

  it('should render Header component', () => {
    expect(wrapper.find('Header').length).toEqual(1);
  });

  it('should render Navbar component', () => {
    expect(wrapper.find('Navbar').length).toEqual(1);
  });

  it('should render Content component when done loading', () => {
    expect(wrapper.find('Content').length).toBeFalsy();
    wrapper.setProps({ loading: false });
    expect(wrapper.find('Content').length).toBeTruthy();
  });

  it('should call functions in ComponentDidMount', () => {
    wrapper.instance().refreshUserInfo = jest.fn();
    wrapper.update();
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().refreshUserInfo).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });
})
