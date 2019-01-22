import React from 'react';
import { shallow } from 'enzyme';

import LeaderCard from '../../../components/Leaderboard/LeaderCard';

describe('LeaderCard', () => {

  it('should render without fail', () => {
    shallow(<LeaderCard leaders={[]} />)
  });

});