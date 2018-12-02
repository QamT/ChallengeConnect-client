import React from 'react';

export default ({ filters, changeFilter, filter: current }) => (
  <div className='challengeNav'>
    <ul>
<<<<<<< HEAD
      {filters.map((filter, index) => <li 
                              key={index}
=======
      {filters.map(filter => <li 
>>>>>>> 919878c6e821db29ca43cf89afb65ddb3329a6b0
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