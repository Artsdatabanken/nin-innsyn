import typesystem from "@artsdatabanken/typesystem";
import React from "react";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";
import backend from "../backend";
import Kart from "../Kart";
import { SettingsContext } from "../SettingsContext";
import språk from "../språk";
import VenstreVinduContainer from "../VenstreVinduContainer";
import standardlag from "./standardlag.json";
import bakgrunnskarttema from "./bakgrunnskarttema";

const styles = {
  rot: {
    backgroundColor: "#f5f5f5",
    color: "hsla(0, 0%, 0%, 0.87)",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
    position: "fixed",
    left: 0,
    border: 1,
    width: 408,
    height: "100vh",
    zIndex: -10,
    pointerEvents: "auto",
    display: "flex",
    flexDirection: "column"
  },
  transparent: {
    backgroundColor: "transparent",
    boxShadow: "none",
    pointerEvents: "none"
  },
  padTop: { paddingTop: 55 }
};

function isAtRoot(location) {
  if (location.pathname !== "/") return false;
  return location.search === "";
}

class Grunnkart extends React.Component {
  constructor(props) {
    super(props);
    let aktive = standardlag;
    aktive.bakgrunnskart = bakgrunnskarttema;
    aktive = JSON.parse(JSON.stringify(aktive));
    this.state = {
      aktiveLag: aktive,
      opplystKode: "",
      actualBounds: null,
      fitBounds: null,
      meta: null,
      visKoder: false
    };
  }

  handleActualBoundsChange = bounds => {
    this.setState({ actualBounds: bounds, fitBounds: null });
  };

  handleFitBounds = bbox => {
    this.setState({ fitBounds: bbox });
  };

  handleBoundsChange = bbox => {
    this.setState({ actualBounds: bbox });
  };

  addSelectedBarn(barn) {
    return barn.map(node => {
      const kode = node.kode;
      return {
        kode: kode,
        tittel: språk(node.tittel),
        farge: node.farge,
        erSynlig: true,
        kanSlettes: true,
        value: node.value
      };
    });
  }

  handleAktiver = koder => {
    this.setState({
      aktiveLag: JSON.parse(JSON.stringify(standardlag))
    });
    koder.forEach(kode => {
      this.downloadMeta("/katalog/" + kode).then(data => {
        this.addSelected(data);
      });
    });
  };

  addSelected = props => {
    let aktive = this.state.aktiveLag;
    const kartformat = props.kartformat;
    if (!kartformat) return;
    let aktivtKartformat = Object.keys(kartformat)[0];
    const nyttLag = JSON.parse(JSON.stringify(props));
    nyttLag.visBarn = props.barn.length > 0;
    /*    const nyttLag = {
      kartformat: kartformat,
      url: props.url,
      aktivtKartformat: aktivtKartformat,
      farge: props.farge,
      gradient: props.gradient,
      kode: props.kode,
      tittel: språk(props.tittel),
      barn: this.addSelectedBarn(props.barn),
      visBarn: props.barn.length > 0,
      bbox: props.bbox,
      kanSlettes: true
    };*/
    //    nyttLag.tittel = språk(nyttLag.tittel);
    aktive[nyttLag.kode] = nyttLag;
    this.setState({
      aktiveLag: Object.assign({}, aktive)
    });
  };

  handleToggleLayer = (kode, enabled) => {
    if (enabled) this.addSelected(this.state.meta);
    else {
      const koder = this.state.aktiveLag.filter(barn => barn.kode !== kode);
      this.setState({
        aktiveLag: koder
      });
    }
  };

  _handleKeyDown = event => {
    const ESCAPE_KEY = 27;
    switch (event.keyCode) {
      case ESCAPE_KEY:
        this.props.history.goBack();
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    this.fetchMeta(this.props.location.pathname);
    window.addEventListener("keydown", this._handleKeyDown);
  }

  componentDidUnMount() {
    window.removeEventListener("keydown", this._handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    const path = this.props.location.pathname;
    if (path !== prevProps.location.pathname) this.fetchMeta(path);
    document.title =
      (this.state.meta && this.state.meta.tittel.nb) || "Natur i Norge";
  }

  redirectTo(path) {
    const newUrl = "/" + path;
    console.log("router videre til ", newUrl);
    this.props.history.replace(newUrl);
  }

  fetchMeta(location) {
    let url = location.match(/\/(.*)/);
    this.setState({ meta: null });
    if (!url || url.length !== 2) return;

    this.downloadMeta(url[1]).then(data => {
      if (!data) {
        this.setState({ unknownUrl: url[1] });
        return;
      }
      if (data.se) {
        const newUrl = data.se[Object.keys(data.se)[0]].sti;
        this.redirectTo(newUrl);
        return;
      }
      this.setState({ meta: data, opplystKode: "" });
    });
  }

  async downloadMeta(url) {
    const meta = await backend.hentKodeMeta(url);
    if (!meta) return;
    if (!meta.tittel) {
      return this.redirectTo("Natur_i_Norge");
    }
    if (meta.se) return meta;
    meta.nivå = typesystem.hentNivaa(meta.kode).slice(0, 1);
    meta.prefiks = meta.kode.substring(0, 2);
    meta.aktivtKartformat = Object.keys(meta.kartformat)[0];
    meta.erSynlig = true;
    if (meta.kode.substring(0, 2) === "LA") {
      if (!this.state.aktiveLag.terreng.wasAutoEnabled) {
        this.handleUpdateLayerProp("terreng", "erSynlig", true);
        this.handleUpdateLayerProp("terreng", "wasAutoEnabled", true);
      }
    }
    return meta;
  }

  handleRemoveSelectedLayer = kode => {
    let aktive = this.state.aktiveLag;
    delete aktive[kode];
    this.setState({ aktiveLag: aktive });
    this.props.history.push("/");
  };

  // Supports composite keys i.e. gradient.filterMin
  handleUpdateLayerProp = (kode, key, value) => {
    const aktive = this.state.aktiveLag;
    let node = aktive[kode];
    const parts = key.split(".");
    for (let i = 0; i < parts.length - 1; i++) node = node[parts[i]];
    const vkey = parts[parts.length - 1];
    node[vkey] = value;
    this.setState({ aktiveLag: Object.assign({}, aktive) });
  };

  // Supports composite keys i.e. gradient.filterMin
  handleUpdateMetaProp = (kode, key, value) => {
    const aktive = this.state.meta;
    let node = aktive.barn[kode];
    const parts = key.split(".");
    for (let i = 0; i < parts.length - 1; i++) node = node[parts[i]];
    const vkey = parts[parts.length - 1];
    node[vkey] = value;
    aktive.barn[kode] = Object.assign({}, aktive.barn[kode]);
    this.setState({ meta: Object.assign({}, aktive) });
  };

  render() {
    let erAktivert = false;
    if (this.state.meta)
      erAktivert = !!this.state.aktiveLag[this.state.meta.kode];
    const { classes, history } = this.props;
    return (
      <SettingsContext.Consumer>
        {context => {
          const transparent = isAtRoot(history.location);
          return (
            <React.Fragment>
              <div
                className={classNames(
                  classes.rot,
                  transparent && classes.transparent
                )}
              >
                <VenstreVinduContainer
                  aktiveLag={this.state.aktiveLag}
                  mapBounds={this.state.actualBounds}
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  onFitBounds={this.handleFitBounds}
                  erAktivert={erAktivert}
                  opplystKode={this.state.opplystKode}
                  onToggleLayer={this.handleToggleLayer}
                  onRemoveSelectedLayer={this.handleRemoveSelectedLayer}
                  meta={this.state.meta}
                  unknownUrl={this.state.unknownUrl}
                  onUpdateLayerProp={this.handleUpdateLayerProp}
                  onUpdateMetaProp={this.handleUpdateMetaProp}
                  visAktiveLag={context.visAktiveLag}
                  onToggleAktiveLag={context.onToggleAktiveLag}
                />
              </div>
              <Kart
                bounds={this.state.fitBounds}
                latitude={65.4}
                longitude={10.8}
                zoom={3}
                aktiveLag={this.state.aktiveLag}
                opplystKode={this.state.opplystKode}
                meta={this.state.meta}
                onMapBoundsChange={this.handleActualBoundsChange}
                onMapMove={context.onMapMove}
              />
            </React.Fragment>
          );
        }}
      </SettingsContext.Consumer>
    );
  }

  handleMouseEnter = kode => {
    this.setState({ opplystKode: kode });
  };

  handleMouseLeave = kode => {
    this.setState({ opplystKode: "" });
  };
}

export default withStyles(styles)(withRouter(Grunnkart));
