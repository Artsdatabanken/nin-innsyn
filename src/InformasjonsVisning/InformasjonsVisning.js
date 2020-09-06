import React from "react";
import { withRouter } from "react-router-dom";
import Lokalitet from "InformasjonsVisning/Lokalitet/Lokalitet";
import Hjelp from "InformasjonsVisning/Hjelp/Hjelp";
import parseQueryString from "./Katalog/KatalogFunksjoner/parseQueryString";
import finnKurvevariabler from "./Katalog/KatalogFunksjoner/finnKurvevariabler";
import KatalogFane from "./Katalog/Katalog";
import Punkt from "./Punkt";
import { Typography } from "@material-ui/core";

// Denne boksen inneholder alle informasjonsvisningssidene
class InformasjonsVisning extends React.Component {
  dataQueryNumber = 0;
  state = {
    error: "",
    data: {},
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.meta !== this.props.meta) this.setState({ query: null });
  }

  render() {
    const data = this.state.data;
    const {
      opplyst,
      onMouseEnter,
      onMouseLeave,
      onUpdateLayerProp,
      onUpdateMetaProp,
      meta,
      location,
      aktivTab,
      path,
      handleNavigate,
      handleLokalitetUpdate,
    } = this.props;
    const kurve = finnKurvevariabler(this.props.aktiveLag);

    if (path === "/Natur_i_Norge/hjelp") {
      return <Hjelp aktivTab={aktivTab} />;
    }

    if (
      location.search &&
      location.search.includes("?lng") &&
      location.search.includes("informasjon")
    ) {
      const { lng, lat, vis } = parseQueryString(location.search);
      return (
        <div
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            overflowY: "auto",
            top: 64,
            bottom: 0,
            left: 408,
            right: 50,
          }}
        >
          <div style={{ margin: 16 }}>
            <Typography
              variant="h5"
              style={{ marginBottom: 16, color: "#777", fontWeight: "bold" }}
            >
              Landskap
            </Typography>
            <Typography variant="body1" style={{ marginBottom: 24 }}>
              En landskapstype er en samling av variasjoner i terreng og
              landeformer som sammen påvirker et større område. I kartleggingen
              er den minste graden som måles på en kvadratkilometer. Man kan
              dermed befinne seg i et isbrelandskap uten å være akkurat på en
              isbre. Det vil også kunne være noen små variasjoner som ikke
              bestemmer landskapstypen da de er små og derav ikke dominerende.
            </Typography>
            <Punkt
              lng={lng}
              lat={lat}
              vis={vis}
              aktivTab={aktivTab}
              history={this.props.history}
              onNavigate={handleNavigate}
              handleLokalitetUpdate={handleLokalitetUpdate}
            />
          </div>
        </div>
      );
    }

    return (
      <div
        className={
          (aktivTab === "informasjon" ? "mobile_on" : "mobile_off") +
          " main_body"
        }
      >
        {meta && (
          <KatalogFane
            meta={meta}
            onFitBounds={this.props.onFitBounds}
            onUpdateLayerProp={onUpdateLayerProp}
            onNavigate={handleNavigate}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            opplyst={opplyst}
            data={data}
            onUpdateMetaProp={onUpdateMetaProp}
            has_error={this.state.error}
            handleCloseSnackbar={this.handleCloseSnackbar}
            erAktivert={this.props.erAktivert}
            onToggleLayer={this.props.onToggleLayer}
            kurve={kurve}
          />
        )}
        <div className="big_page_sidebar" />
      </div>
    );
  }
  handleCloseSnackbar = () => this.setState({ error: null });
}

export default withRouter(InformasjonsVisning);
