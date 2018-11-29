import React from 'react';

export default ({ filters, changeFilter, filter: current }) => (
  <div className='challengeNav'>
    <ul>
      {filters.map(filter => <li 
                              className={filter === current ? 'bold': null}
                              value={filter} 
                              onClick={(e) => changeFilter(e.target.getAttribute('value'))} 
                              tabIndex='0'
                             >
                              {filter}
                             </li>)
      }
    </ul>
  </div>
)