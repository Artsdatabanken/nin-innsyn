import { Drawer, IconButton, ListItem, MenuItem } from '@material-ui/core'
import { withTheme } from '@material-ui/core/styles'
import React, { Component } from 'react'
import NavigationChevronLeftDouble from './NavigationChevronLeftDouble'
class MainDrawer extends Component {
  render() {
    console.log(this.props)
    return (
      <Drawer
        docked={false}
        open={this.props.open}
        onRequestChange={open => this.props.onToggleMainDrawer(open)}
        style={{ paddingLeft: 32 }}
      >
        <ListItem
          style={{ borderBottom: '1px solid ' }}
          leftAvatar={
            <img
              alt="logo"
              style={{ height: '38px' }}
              src="https://pbs.twimg.com/profile_images/882873307133083648/_1-mmxih_400x400.jpg"
            />
          }
          primaryText={
            <span style={{ fontSize: 20, fontWeight: 500 }}>Natur i Norge</span>
          }
          rightIcon={
            <IconButton onClick={this.props.onToggleMainDrawer}>
              <NavigationChevronLeftDouble
                viewBox="0 0 28 28"
                color={this.props.theme.palette.action.disabled}
              />
            </IconButton>
          }
          disabled
        />
        <MenuItem
          onClick={() => {
            this.props.handleChangeBaseMap('')
          }}
        >
          Basiskart
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.props.onToggleMainDrawer()
            this.props.handleChangeBaseMap('dark')
          }}
        >
          Basiskart - Mørk
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.props.onToggleMainDrawer()
            this.props.handleChangeBaseMap('vintage')
          }}
        >
          Basiskart - Gammel
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.props.onToggleMainDrawer()
            this.props.handleChangeBaseMap('light')
          }}
        >
          Basiskart - Lyst
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.props.onToggleMainDrawer()
            this.props.handleChangeBaseMap('satellite')
          }}
        >
          Flyfoto
        </MenuItem>
        <hr />
        <MenuItem>Del eller bygg inn kartet</MenuItem>
        <MenuItem>Skriv ut</MenuItem>
        <MenuItem>Send tilbakemeldinger</MenuItem>
        <hr />
        <MenuItem>Søkeinnstillinger</MenuItem>
      </Drawer>
    )
  }
}
export default withTheme()(MainDrawer)
