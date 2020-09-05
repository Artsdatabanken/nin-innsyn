import React from "react";
import { Close, Landscape } from "@material-ui/icons";
import språk from "Funksjoner/språk";
import fixSearchParams from "AppSettings/AppFunksjoner/fixSearchParams";
import { IconButton } from "@material-ui/core";

function roundToX(num, x) {
  return +(Math.round(num + "e+" + x) + "e-" + x);
}

const PopUp = ({ parent, path }) => {
  if (!parent.state.data) return null;

  const koordinat = parent.state.koordinat;
  const { kommune, fylke, landskap, sted } = parent.state.data;
  return (
    <button
      onClick={e => {
        parent.props.handleFullscreen(false);
        parent.props.history.push(parent.state.buttonUrl + "?informasjon");
      }}
      className="popup"
      style={{
        transform:
          "translate3d(" +
          parent.state.windowXpos +
          "px, " +
          parent.state.windowYpos +
          "px, 0px)"
      }}
    >
      <IconButton
        style={{ position: "absolute", right: 4, top: 4 }}
        size="small"
        onClick={e => {
          parent.removeMarker();
          parent.props.handleLokalitetUpdate(null);
          parent.props.history.push(fixSearchParams(path));

          parent.setState({
            showPopup: !parent.state.showPopup
          });
        }}
      >
        <Close></Close>
      </IconButton>

      <>
        {roundToX(koordinat[0], 5)}° N {roundToX(koordinat[1], 5)}° Ø
        <br />
      </>

      {sted && (
        <>
          {parent.state.sted} <br />
        </>
      )}

      <>
        {kommune && <b>{språk(kommune.tittel)}</b>}
        {kommune.tittel && fylke.tittel && <b>{", "} </b>}
        {fylke && (
          <b>
            {språk(fylke.tittel)} <br />
          </b>
        )}
        {landskap && (
          <>
            <Landscape /> {språk(landskap.tittel)} <br />
          </>
        )}
      </>
    </button>
  );
};

export default PopUp;
