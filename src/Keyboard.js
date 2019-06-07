import React from 'react'

const Keyboard = ({ letter, feedback, onClick }) => (
  <div className="letter" style={{color: `${feedback}`}} onClick={() => onClick(letter)}>
    <span className="keyboard">
      {letter}
    </span>
  </div>
)

export default Keyboard