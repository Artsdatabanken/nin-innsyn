import React from 'react'
import Checkboard from './Checkboard'

const PaintSwatch = ({ color, onClick, muiTheme }) => (
  <div
    onClick={e => {
      onClick(e)
    }}
    style={{
      top: '14px',
      right: '14px',
      height: '28px',
      width: '28px',
    }}
  >
    <Checkboard
      borderRadius="50%"
      color={color}
      style={{
        border: '1px solid hsla(0, 0%, 0%, 0.2)',
      }}
    />
  </div>
)

export default PaintSwatch
