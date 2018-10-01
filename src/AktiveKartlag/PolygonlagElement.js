import React from 'react'
import { withRouter } from 'react-router'
import KartlagElement from './Kartlagelement'

class PolygonlagElement extends React.Component {
  render() {
    const {
      tittel,
      erSynlig,
      farge,
      kode,
      visKoder,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onUpdateLayerProp,
    } = this.props

    return (
      <KartlagElement
        tittel={tittel}
        undertittel={visKoder && kode}
        erSynlig={erSynlig}
        farge={farge}
        kode={kode}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onUpdateLayerProp={onUpdateLayerProp}
      />
    )
  }
}

export default withRouter(PolygonlagElement)
