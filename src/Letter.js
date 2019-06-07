import React from 'react'

const HIDDEN_SYMBOL = '_'

const Letter = ({ letter, feedback}) => (
  <div className={`letter ${feedback}`}>
    <span className="symbol">
      {feedback === 'hidden' ? HIDDEN_SYMBOL : letter}
    </span>
  </div>
)

export default Letter