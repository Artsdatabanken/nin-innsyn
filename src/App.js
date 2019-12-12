import metadata from "./metadata";
import TopBarContainer from "./TopBar/TopBarContainer";
import RightWindow from "./RightWindow";
import XML from "pixl-xml";
import React from "react";
import { withRouter } from "react-router";
import backend from "Funksjoner/backend";
import { SettingsContext } from "SettingsContext";
import Kart from "Kart/LeafletTangram/Leaflet";
import metaSjekk from "AppSettings/AppFunksjoner/metaSjekk";
import fetchMeta from "AppSettings/AppFunksjoner/fetchMeta";
import aktiverFraHistorikk from "AppSettings/AppFunksjoner/aktiverFraHistorikk";
import aktiverValgtKartlag from "AppSettings/AppFunksjoner/aktiverValgtKartlag";
import oppdaterMetaProperties from "AppSettings/AppFunksjoner/oppdaterMetaProperties";
import oppdaterLagProperties from "AppSettings/AppFunksjoner/oppdaterLagProperties";
import bakgrunnskarttema from "AppSettings/bakgrunnskarttema";
import BaseMapSelector from "./BaseMapSelector";

export let exportableSpraak;
export let exportableFullscreen;

function getPathTab(path) {
  const searchparams = path.search.split("?");
  for (let i in searchparams) {
    const item = searchparams[i];
    if (!item.includes("lng") && item !== "undefined" && item !== "") {
      return item;
    }
  }
  return "informasjon";
}

function getPathNotTab(path) {
  const searchparams = path.search.split("?");
  for (let i in searchparams) {
    const item = searchparams[i];
    if (item.includes("lng") && item !== "undefined" && item !== "") {
      return "?" + item;
    }
  }
  return "";
}

class App extends React.Component {
  constructor(props) {
    super(props);
    let aktive = {
      bakgrunnskart: JSON.parse(JSON.stringify(bakgrunnskarttema))
    };
    this.state = {
      forvaltningsportalen: "true",
      aktiveLag: aktive,
      forvaltningsLag: aktive,
      opplystKode: "",
      opplyst: {},
      actualBounds: null,
      fitBounds: null,
      meta: null,
      lokalitetdata: null,
      visKoder: false,
      navigation_history: [],
      showCurrent: true,
      showFullscreen: false,
      spraak: "nb"
    };
    exportableSpraak = this;
    exportableFullscreen = this;
  }

  render() {
    const { history } = this.props;
    const path = this.props.location.pathname;

    return (
      <SettingsContext.Consumer>
        {context => {
          return (
            <>
              <>
                <TopBarContainer
                  _tittel={"Økologisk grunnkart forvaltningsportal"}
                />
                <BaseMapSelector />
                <Kart
                  handleLokalitetUpdate={this.handleLokalitetUpdate}
                  forvaltningsportal={true}
                  show_current={this.state.showCurrent}
                  bounds={this.state.fitBounds}
                  latitude={65.4}
                  longitude={15.8}
                  zoom={2.9}
                  _aktiveLag={this.state.forvaltningsLag}
                  aktiveLag={Object.assign(
                    this.state.forvaltningsLag,
                    this.state.meta && this.state.meta.barn
                  )}
                  opplyst={this.state.opplyst}
                  opplystKode={this.state.opplystKode}
                  meta={this.state.meta}
                  onMapBoundsChange={this.handleActualBoundsChange}
                  onMapMove={context.onMapMove}
                  history={history}
                  onRemoveSelectedLayer={this.handleRemoveSelectedLayer}
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                />
                <RightWindow
                  {...this.state}
                  path={path}
                  history={history}
                  show_current={this.state.showCurrent}
                  handleShowCurrent={this.handleShowCurrent}
                  onFitBounds={this.handleFitBounds}
                  onUpdateLayerProp={this.handleForvaltningsLayerProp}
                  meta={this.state.meta || {}}
                  aktiveLag={Object.assign(
                    {},
                    this.state.forvaltningsLag,
                    this.state.meta && this.state.meta.barn
                  )}
                />
              </>
            </>
          );
        }}
      </SettingsContext.Consumer>
    );
  }

  handleNavigate = url => {
    let new_url = url;
    if (!url || url === undefined) {
      return;
    }
    if (new_url[0] !== "/") {
      new_url = "/" + url;
    }
    this.props.history.push(new_url + "?" + getPathTab(this.props.location));
  };

  onNavigateToTab = tab => {
    this.props.history.push(getPathNotTab(this.props.location) + "?" + tab);
  };
  handleActualBoundsChange = bounds => {
    this.setState({ actualBounds: bounds, fitBounds: null });
  };
  handleFitBounds = bbox => {
    this.setState({ fitBounds: bbox });
  };
  handleShowCurrent = show_current => {
    this.setState({ showCurrent: show_current });
  };
  handleBoundsChange = bbox => {
    this.setState({ actualBounds: bbox });
  };
  handleSpraak = spraak => {
    this.setState({ spraak: spraak });
  };

  handleLokalitetUpdate = (lng, lat) => {
    const layers = {
      løsmasse:
        "http://geo.ngu.no/mapserver/LosmasserWMS?service=wms&version=1.1.1&srs=EPSG:4326&layers=Losmasse_flate&query_layers=Losmasse_flate&info_format=application/vnd.ogc.gml&height=921&width=1920&{x}&{y}",
      laksefjord:
        "https://ogc.fiskeridir.no/wms.ashx?service=wms&version=1.1.1&srs=EPSG:4326&layers=layer_388&query_layers=layer_388&info_format=application/vnd.ogc.gml&height=921&width=1920&{x}&{y}",
      naturtype:
        "https://kart.miljodirektoratet.no/arcgis/services/naturtyper_nin/MapServer/WMSServer?version=1.1.1&layers=naturtyper_nin_alle&query_layers=naturtyper_nin_alle&srs=EPSG%3A4326&height=921&width=1920",
      arealtype:
        "https://wms.nibio.no/cgi-bin/ar50?version=1.1.0&srs=EPSG:4326&feature_count=1&info_format=application/vnd.ogc.gml&layers=Arealtyper&query_layers=Arealtyper&x=699&y=481&height=921&width=1920",
      livsmiljø:
        "https://wms.nibio.no/cgi-bin/skogbruksplan?version=1.1.0&srs=EPSG:4326&feature_count=1&info_format=application/vnd.ogc.gml&layers=Livsmiljoer&query_layers=Livsmiljoer&x=699&y=481&height=921&width=1920",
      vassdrag:
        "https://gis3.nve.no/map/services/VerneplanforVassdrag/MapServer/WmsServer?QUERY_LAYERS=VerneplanforVassdrag&styles=&format=image%2Fpng&transparent=true&version=1.1.1&width=256&height=256&srs=EPSG%3A4326",
      landskap:
        "https://wms.artsdatabanken.no/?map=/maps/mapfiles/la.map&version=1.1.1&width=256&height=256&INFO_FORMAT=gml&QUERY_LAYERS=LA&layers=LA&srs=EPSG%3A4326&{x}&{y}"
    };
    this.setState({
      lat,
      lng,
      sted: null,
      wms1: null
    });
    backend.hentStedsnavn(lng, lat).then(sted => {
      this.setState({
        sted: sted
      });
    });
    //   lng = 9.676521245246727;
    //   lat = 62.83068996597348;
    Object.keys(layers).forEach(key => {
      let url = layers[key];
      url += "&request=GetFeatureInfo";
      url += "&service=WMS";
      url = url.replace("{x}", "&x=" + lng);
      url = url.replace("{y}", "&y=" + lat);
      const delta = key === "naturtype" ? 0.0001 : 0.01;
      backend.wmsFeatureInfo(url, lat, lng, delta).then(response => {
        const res = XML.parse(response.text);
        res.url = response.url;
        console.log(key, res);
        this.setState({ [key]: res.FIELDS || res });
      });
    });
  };

  handleFullscreen = showFullscreen => {
    this.setState({ showFullscreen: showFullscreen });
  };
  handleClearSearchFor = () => this.setState({ searchFor: null });
  handleToggleLayer = () => {
    this.addSelected(this.state.meta);
  };
  componentDidMount() {
    fetchMeta(this.props.location.pathname, this);
  }

  addSelected = props => {
    this.setState({
      aktiveLag: Object.assign(
        {},
        aktiverValgtKartlag(props, this.state.aktiveLag)
      )
    });
  };

  activateLayerFromHistory = node => {
    const aktive = this.state.aktiveLag;
    this.setState({
      aktiveLag: Object.assign({}, aktiverFraHistorikk(aktive, node))
    });
  };

  async downloadMeta() {
    const meta = metadata;
    console.warn("meta", meta);
    metaSjekk(meta, this);
    return meta;
  }

  handleRemoveSelectedLayer = kode => {
    let aktive = this.state.aktiveLag;
    delete aktive[kode];
    this.setState({ aktiveLag: aktive });
  };

  handleUpdateLayerProp = (layer, key, value, elementType) => {
    this.setState({
      aktiveLag: Object.assign(
        {},
        oppdaterLagProperties(layer, key, value, this, elementType)
      )
    });
  };

  handleUpdateLokalitetLayerProp = (layer, key, value) => {
    this.setState({
      lokalitetdata: Object.assign(
        {},
        oppdaterLagProperties(layer, key, value, this, "lokalitetdata")
      )
    });
  };

  handleForvaltningsLayerProp = (layer, key, value) => {
    let nye_lag = this.state.forvaltningsLag;
    for (let item in this.state.forvaltningsLag) {
      if (this.state.forvaltningsLag[item].kode === layer) {
        nye_lag[item][key] = value;
      }
    }
    this.setState({
      forvaltningsLag: Object.assign({}, nye_lag)
    });
  };

  handleUpdateMetaProp = (kode, key, value) => {
    this.setState({
      meta: Object.assign({}, oppdaterMetaProperties(kode, key, value, this))
    });
  };

  handleMouseEnter = ({ kode, url }) => {
    // console.log("mouseenter", kode, url);
    this.setState({ opplystKode: kode, opplyst: { kode: kode, url: url } });
  };

  handleMouseLeave = () => {
    // console.log("mouseleave");
    this.setState({ opplystKode: "", opplyst: {} });
  };

  static contextType = SettingsContext;
}

export default withRouter(App);
