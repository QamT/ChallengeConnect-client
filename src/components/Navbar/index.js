import React from 'react';
import uuid from 'uuid/v4';

export default class Navbar extends React.Component {
  state = {
    prevSection: 'Status'
  }

  componentDidUpdate(prevProps) {
    if (prevProps.section !== this.props.section) this.setState({ prevSection: prevProps.section });
  }

  render() {
    const { sections, changeSection, section: current } = this.props;
    const { prevSection: prev } = this.state;
    let className = 'highlight';
    
    if (current === sections[2]) {
      className = 'highlight highlight-right';
    } else if (current === sections[0]) {
      className = 'highlight highlight-left';
    } else if (prev === sections[0]) {
      className = 'highlight highlight-right';
    } else {
      className = 'highlight highlight-left';
    } 

    return (
      <nav className='navbar' role='navigation'>
        <ul>
          {sections.map(
            section => 
              <li 
                key={uuid()}
                className={section === current ? className : null}
                value={section} 
                aria-label={`${section} section`}
                onClick={e => changeSection(e.target.getAttribute('value'))} 
                onKeyDown={e => (e.key === 'Enter' && changeSection(e.target.getAttribute('value')))}
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
}