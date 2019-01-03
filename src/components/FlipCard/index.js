//Rewrite of kennethormandy/react-flipcard, MIT via https://github.com/kennethormandy/react-flipcard

import React from 'react';

export default class FlipCard extends React.Component {
  static defaultProps = {
    flipped: false
  }

  state = {
    isFlipped: this.props.flipped
  }

  componentDidUpdate() {
    if (this.props.flipped !== this.state.isFlipped) {
      this.setState(state => ({ isFlipped: !state.isFlipped }))
    }
  }

  render() {
    const { isFlipped } = this.state;
    const classes = [
      'Flipcard-flipper',
      isFlipped === true ? 'Flipcard--flipped': '',
    ]
   
    return (
      <div className='Flipcard' tabIndex='0'>
        <div className={classes.join(' ') }>
          {[0, 1].map(index => {
            const child = this.props.children[index];
            let zero = 0;
            let one = 1;

            if (index === 1) {
              zero = 1;
              one = 0;
            }

            return (
              <div
                key={`Flipcard_card_${index}`}
                className={`Flipcard-${index === 0 ? 'front' : 'back'}`}
                style={{
                  opacity: isFlipped ? zero : one,
                  userSelect: isFlipped ? 'none': null,
                }}
                tabIndex={-1}
                aria-hidden={isFlipped}
              >
              {child}
              </div>
            )
          })}
        </div>
      </div>
    )
  }  
}

