import muiThemeable from 'material-ui/styles/muiThemeable'
import React from 'react'

const Label = ({ children, disabled, muiTheme }) => (
  <div
    style={{
      position: 'relative',
      float: 'left',
      left: 56,
      fontFamily: muiTheme.fontFamily,
      fontSize: 16,
      fontWeight: 400,
      color: disabled
        ? muiTheme.palette.disabledColor
        : muiTheme.palette.textColor,
    }}
  >
    {children}
  </div>
)

export default muiThemeable()(Label)
