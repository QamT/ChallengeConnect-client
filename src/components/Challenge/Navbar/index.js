import React from 'react';
import { string, func, arrayOf } from 'prop-types';

const Navbar = ({ prevSection = '', section: current, sections, changeSection }) => {
  const highlight = (() => {
    switch(current) {
      case sections[2]: 
        return 'highlight-right';
      case sections[0]:
        return 'highlight-left';
      default:
        return prevSection === sections[0] ? 'highlight-right' : 'highlight-left';
    }
  })();
  
  return (
    <nav className='navbar' role='navigation'>
      <ul>
        {sections.map(
          section => 
            <li 
              key={section}
              className={section === current ? `highlight ${highlight}` : null}
              aria-label={`${section} section`}
              onClick={e => changeSection(e, section)} 
              onKeyDown={e => changeSection(e, section)}
              tabIndex='0'
            >
              {section}
            </li>
          )
        }
      </ul>
    </nav>
  )
}

Navbar.propTypes = {
  prevSection: string,
  section: string.isRequired,
  sections: arrayOf(string).isRequired,
  changeSection: func.isRequired
}

export default Navbar;