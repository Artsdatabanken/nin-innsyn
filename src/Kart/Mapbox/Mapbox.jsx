import React, { Component } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import backend from "../../backend";
import NatureAreaDetails from '../../Naturområdedetaljer/NatureAreaDetails'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

class Mapbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            natureArea: "",
            metadata: "",
            open: false,

            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                latitude: props.latitude,
                longitude: props.longitude,
                zoom: props.zoom
            }
        }
    }
    handleToggle = () => this.setState({open: !this.state.open});

    goFetch(id) {
        backend.getNatureAreaByLocalId(id)
            .then(data => {
                    this.setState({
                        natureArea: data
                    })
                }
            );
        backend.getMetadataByNatureAreaLocalId(id)
            .then(data =>
                this.setState({
                    metadata: data
                })
            )
    }

  _onViewportChange = viewport =>
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
  })

  onClick = point => {
        let localId = "";
        if (point.features && point.features[0] && point.features[0].properties && point.features[0].properties.localId) {
            localId = point.features[0].properties.localId;
            this.goFetch(localId)
            this.setState({open: true});
        }
    //alert(point.lngLat + "\n" + localId)
  }

   onHover = point => {
        console.log(point.lngLat)
   }

    render() {
        return <MuiThemeProvider>
            <div>

            <ReactMapGL
                {...this.state.viewport}
                onClick={this.onClick}
                onHover={this.onHover}
                onViewportChange={viewport => this._onViewportChange(viewport)}
                //mapboxApiAccessToken="pk.eyJ1IjoiYmpyZXBwZW4iLCJhIjoiY2ltZGFkMW11MDAwdnZpbHVsamhsZzB1dSJ9.oZBI8rZR8YSsXoyIM0vLYg"
                mapboxApiAccessToken="pk.eyJ1IjoiYW11bmRuIiwiYSI6ImNqYnhweHFjMTJxczczMnBwN3Jmaml2c2wifQ.oPYPvVXUxTztCvw0E2QZ9A"
                //mapStyle="mapbox://styles/bjreppen/cjbxoxrvdeej42smmvf4ibbb0"
                mapStyle="mapbox://styles/amundn/cjbxq1m6redp82sqzgt72edqf"
              >
                <Marker latitude={63.4139} longitude={10.4064} offsetLeft={-20} offsetTop={-10}>
                    <div>Are you here?</div>
                </Marker>
                <IconButton
                    onClick={this.handleToggle}>
                    <NavigationMenu />
                </IconButton>
            </ReactMapGL>
                <Drawer open={this.state.open}>
                    <MenuItem onClick={this.handleToggle}>Lukk</MenuItem>
                        <NatureAreaDetails
                            natureArea={this.state.natureArea}
                            metadata={this.state.metadata}
                        />
                </Drawer>
            </div>
        </MuiThemeProvider>
    }
}

export default Mapbox;