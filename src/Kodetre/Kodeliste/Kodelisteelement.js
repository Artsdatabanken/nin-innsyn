// @flow
import { ListItem, Typography, ListItemText } from "@material-ui/core";
import React from "react";
import språk from "../../språk";
import Bildeavatar from "./Bildeavatar";
import VolumIndikator from "./VolumIndikator";
import opplyst from "../../Kart/LeafletTangram/scene/visualisering/palette/opplyst";
//import Arealbruksintensitet from './Filter/Arealbruksintensitet'
type State = {};

type Props = {
  kode: string,
  visKode: Boolean,
  meta: Object,
  størsteAreal: number,
  areal: number,
  onMouseLeave: Function,
  onMouseEnter: Function,
  onChange: Function,
  onGoToCode: Function,
  opplystKode: string,
  utenFarge: Boolean
};

function getSecondary(meta) {
  let { intervall } = meta;
  if (!intervall) return;
  if (!Array.isArray(intervall)) intervall = [intervall];
  const items = intervall.map(i => {
    if (!i.minTekst) return "< " + i.maxTekst;
    if (!i.maxTekst) return "> " + i.minTekst;
    return `${i.tittel && i.tittel + " "}${i.minTekst} - ${i.maxTekst}`;
  });
  const r = items.join(", ") + " " + intervall[0].måleenhet;
  return r;
}

class Kodelisteelement extends React.Component<Props, State> {
  shouldComponentUpdate(np) {
    if (np.areal !== this.props.areal) return true;
    if (np.value !== this.props.value) return true;
    if (np.opplystKode !== this.props.opplystKode) return true;
    return false;
  }

  render() {
    const {
      meta,
      kode,
      opplystKode,
      visKode,
      onGoToCode,
      onMouseEnter,
      onMouseLeave,
      areal,
      størsteAreal
    } = this.props;
    return (
      <React.Fragment>
        <ListItem
          dense={true}
          key={kode}
          onClick={() => onGoToCode(kode)}
          onMouseEnter={() => onMouseEnter && onMouseEnter(kode)}
          onMouseLeave={() => onMouseLeave && onMouseLeave(kode)}
          button={true}
        >
          <VolumIndikator størsteAreal={størsteAreal} areal={areal} />
          {true && (
            <Bildeavatar
              kode={kode}
              farge={opplyst(kode, opplystKode, meta.farge)}
              size="small"
            />
          )}
          <ListItemText
            style={{ width: "50%" }}
            primary={språk(meta.tittel)}
            secondary={getSecondary(meta)}
          />
          {visKode && (
            <Typography variant="caption" noWrap>
              {kode}
            </Typography>
          )}
        </ListItem>
        {/*kode === 'LA-KLG-AI' && (
          <ListItem>
            <Arealbruksintensitet value={meta.value} onChange={onChange} />
          </ListItem>
        )*/}
      </React.Fragment>
    );
  }
}

export default Kodelisteelement;
