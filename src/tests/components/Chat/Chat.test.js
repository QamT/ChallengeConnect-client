import React from 'react';
import { shallow } from 'enzyme';

import { Chat } from '../../../components/Chat';

describe('Chat', () => {
  it('should render without fail', () => {
    const wrapper = shallow(<Chat />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should call componentDidMount', () => {
    const spy = jest.spyOn(Chat.prototype, 'componentDidMount');
    const wrapper = shallow(<Chat />);
    expect(spy).toHaveBeenCalled();
  });

  it('should toggle chat when chat clicked', () => {
    const wrapper = shallow(<Chat />);
    const event = { type: 'click' };
    expect(wrapper.state().displayChat).toEqual(false);
    wrapper.find('h4').simulate('click', event);
    expect(wrapper.state().displayChat).toEqual(true);
  })
})