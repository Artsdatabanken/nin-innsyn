import React, { useState } from "react";
import "./Informasjon.css";

const Informasjon = props => {
  const [turnOffInfo, setturnOffInfo] = useState("på");
  return (
    <React.Fragment>
      {turnOffInfo != "turn off" && (
        <div className="info_component">
          {turnOffInfo}
          <div className="infoBox">
            <div className="top_image" />
            <button
              className="close_button"
              onClick={() => setturnOffInfo("turn off")}
            >
              X
            </button>
            <div className="container_padding">
              <h1>Velkommen til Naturtyper i Norge</h1>
              <h2>NiN - Kart Versjon 1.0</h2>
              <button
                className="mobile_close_button"
                onClick={() => setturnOffInfo("turn off")}
              >
                Gå til kart
              </button>
              <div className="ingress">
                Natur i Norge (NiN) er et type- og beskrivelsessystem for all
                variasjon i naturen. NiN håndterer variasjonen i alle naturmiljø
                i Norge, fra de store havdyp til de høyeste fjell, og fra
                Skagerrak i sør til Svalbard og Polhavet i nord. NiN håndterer
                også naturvariasjonen på ulike skala gjennom de såkalte
                «Naturmangfoldnivåene», fra storskala Landskapstyper til alle
                livsmedier ned til barken på et tre. Les mer om prosjektet{" "}
                <a href="https://www.artsdatabanken.no/NiN">
                  på nettsidene våre.
                </a>
              </div>
              <div className="infoItemContainer">
                <div className="infoItem">
                  <h3>Slå opp landskap og natursystem</h3>
                  <img src="https://www.artsdatabanken.no/Media/F16592?mode=480x480" />
                  <p>
                    Hvis du klikker i søkefeltet kan du velge landskap eller
                    natursystem, og navigere deg videre for å se det markert på
                    kartet. Under hierarki kan du flytte deg dypere og dypere
                    inn i systemet, og fargeindikatorene under natursystem vil
                    vise deg hva som er vist i kartet.
                  </p>
                </div>
                <div className="infoItem">
                  <h3>Finn informasjon om et område</h3>
                  <img src="https://www.artsdatabanken.no/Media/F21300?mode=320x320" />
                  <p>
                    Ved å klikke på kartet kan du sette en markør, og få opp
                    informasjon om det valgte området.
                  </p>
                </div>
                <div className="infoItem">
                  <h3>Statistikk over landskapsgradient</h3>
                  <img src="https://www.artsdatabanken.no/Media/F21301?mode=320x320" />
                  <p>
                    Hvis du velger en art og klikker på aktiver vil du få opp
                    statistikk for denne arten når du videre navigerer deg inn
                    på de forskjellige landskapsgradientene.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Informasjon;
