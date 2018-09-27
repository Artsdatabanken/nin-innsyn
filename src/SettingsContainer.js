import React, { Component } from 'react'
import { SettingsContext } from './SettingsContext'

class SettingsContainer extends Component {
  state = {
    visKoder: false,
    visAktiveLag: false,
    visHovedmeny: false,
    visForside: true,
  }

  componentDidMount() {
    this.setState({
      visKoder: localStorage.getItem('visKoder') === 'true',
      sorterPåKode: localStorage.getItem('sorterPåKode') === 'true',
      visForside: localStorage.getItem('visForside') === 'true',
    })
  }

  render() {
    return (
      <SettingsContext.Provider
        value={{
          visHovedmeny: this.state.visHovedmeny,
          visForside: this.state.visForside,
          visKoder: this.state.visKoder,
          sorterPåKode: this.state.sorterPåKode,
          visAktiveLag: this.state.visAktiveLag,
          onUpdateValue: this.handleUpdateValue,
          onToggleAktiveLag: this.handleToggleAktivelag,
          onToggleHovedmeny: this.handleToggleHovedmeny,
          onToggleForside: this.handleToggleForside,
        }}
      >
        {this.props.children}
      </SettingsContext.Provider>
    )
  }

  handleUpdateValue = (key, value) => {
    this.setState({ [key]: value })
    localStorage.setItem(key, value)
  }

  handleToggleAktivelag = () =>
    this.handleUpdateValue('visAktiveLag', !this.state.visAktiveLag)

  handleToggleHovedmeny = () => {
    this.handleUpdateValue('visHovedmeny', !this.state.visHovedmeny)
  }

  handleToggleForside = () => {
    console.log('toggle forside', this.state)
    this.handleUpdateValue('visForside', !this.state.visForside)
  }
}

export default SettingsContainer
