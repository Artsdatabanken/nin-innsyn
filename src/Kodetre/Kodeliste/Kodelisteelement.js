import { ListItem, Typography, ListItemText } from "@material-ui/core";
import React from "react";
import språk from "../../språk";
import Bildeavatar from "./Bildeavatar";
import VolumIndikator from "./VolumIndikator";
import opplyst from "../../Kart/LeafletTangram/scene/visualisering/palette/opplyst";

function getSecondary(meta) {
  let { intervall } = meta;
  if (!intervall) return;
  if (!Array.isArray(intervall)) intervall = [intervall];
  const items = intervall.map(i => {
    if (!i.minTekst) return "< " + i.maxTekst;
    if (!i.maxTekst) return "> " + i.minTekst;
    return `${i.tittel ? i.tittel + " " : ""}${i.minTekst} - ${i.maxTekst}`;
  });
  const r = items.join(", ") + " " + (meta.måleenhet || "");
  return r;
}

function kodeSuffix(kode, parentkode) {
  let i = 0;
  while (parentkode[i] === kode[i]) i++;

  if ("0123456789".indexOf(kode[i]) >= 0) i -= 1;
  if (kode[i] === "-") i++;
  return kode.substring(i);
}

class Kodelisteelement extends React.Component {
  shouldComponentUpdate(np) {
    if (np.areal !== this.props.areal) return true;
    if (np.value !== this.props.value) return true;
    if (np.opplystKode !== this.props.opplystKode) return true;
    return false;
  }

  render() {
    const {
      meta,
      parentkode,
      kode,
      url,
      opplystKode,
      visKode,
      onNavigate,
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
          onClick={() => onNavigate(url)}
          onMouseEnter={() => onMouseEnter && onMouseEnter(kode)}
          onMouseLeave={() => onMouseLeave && onMouseLeave(kode)}
          button={true}
        >
          <VolumIndikator størsteAreal={størsteAreal} areal={areal} />
          {true && (
            <Bildeavatar
              kode={kode}
              url={url}
              farge0={meta.farge0}
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
              {kodeSuffix(kode, parentkode)}
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
