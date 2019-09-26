import React from "react";
import { CloudDownload } from "@material-ui/icons";
import språk from "Funksjoner/språk";
import { OpenInNew, KeyboardArrowRight } from "@material-ui/icons";

const KatalogKilder = ({ onNavigate, meta, ...props }) => {
  if (!meta) return null;
  const metadata = meta.datakilde;
  if (!metadata) return null;
  const new_url_1 = "https://data.artsdatabanken.no/";
  const new_url_2 = "/logo_24.png";

  return (
    <div className="kilde_box">
      <h1>Datakilder</h1>
      {metadata.map(datakilde => {
        return (
          <button
            key={datakilde.kode}
            className="kilde_knapp"
            onClick={() => onNavigate(datakilde.url)}
          >
            <img src={new_url_1 + datakilde.url + new_url_2} alt="" />
            {språk(datakilde.tittel)} <br />
            {datakilde.kode}
            <KeyboardArrowRight />
          </button>
        );
      })}

      <button
        className="kilde_knapp"
        onClick={() => {
          window.location = "https://data.artsdatabanken.no/" + meta.url;
        }}
      >
        <CloudDownload /> Last ned åpne data <OpenInNew />
      </button>
    </div>
  );
};

export default KatalogKilder;
