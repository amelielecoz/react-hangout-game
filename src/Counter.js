import React from 'react'
import PropTypes from 'prop-types'

const Counter = ({ gameState }) => {
    return(
        <div className="state">
          Game {gameState}
          </div>
    )
}

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  gameState: PropTypes.oneOf([
    'en cours',
    'perdu',
    'gagné',
  ]).isRequired,
}

export default Counter