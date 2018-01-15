import React, {PureComponent} from 'react';
import {fromJS} from 'immutable';
import MAP_STYLE from '../naturtypekart_style.json';

const defaultMapStyle = fromJS(MAP_STYLE);

//const categories = ['labels', 'roads', 'buildings', 'parks', 'water', 'background', 'naturomrade-NA-M'];
//const categories = ['NA-M','NA-T', 'Kalk', 'Alle naturområder', 'Rødlistede', 'Bioklimatiske soner', 'Seksjoner'];



// Layer color class by type
const colorClass = {
    line: 'line-color',
    fill: 'fill-color',
    background: 'background-color',
    symbol: 'text-color',
    //composite: 'fill-color',
};

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

export default class StyleControls extends PureComponent {

    constructor(props) {
        super(props);



        this.state = {
            newLayer: '',
            categories: ['Kalk', 'Alle naturområder', 'Rødlistede', 'Bioklimatiske soner', 'Seksjoner'],
            visibility: {
                // water: true,
                // parks: true,
                // buildings: true,
                // roads: true,
                // labels: true,
                // background: true,
                "Kalk": false,
                "Alle naturområder": false,
                "Rødlistede": false,
                "Bioklimatiske soner": false,
                "Seksjoner": false,

            },
            color: {
                // water: '#DBE2E6',
                // parks: '#E6EAE9',
                // buildings: '#c0c0c8',
                // roads: '#ffffff',
                // labels: '#78888a',
                // background: '#EBF0F0',
                "kalk": undefined,
                "Alle naturområder": undefined,
                "Rødlistede": undefined,
                "Bioklimatiske soner":undefined,
                "Seksjoner":undefined,
            },
            // Layer id patterns by category
            layerSelector: {
                // background: /background/,
                // water: /water/,
                // parks: /park/,
                // buildings: /building/,
                // roads: /bridge|road|tunnel/,
                // labels: /label|place|poi/,
                "Kalk": /kalk/,
                "Alle naturområder": /naturomrader6/,
                "Rødlistede": /Rodlistede/,
                "Bioklimatiske soner": /soner2017-4326-6fcqhb/,
                "Seksjoner": /seksjoner2017-4326-c6e9g5/,
            }
        };
    }

    makeLayer(name, code, visibel, source) {
        const color = {...this.state.color, [name]: '#003399'};
        //this.setState({color});
        const visibility = {...this.state.visibility, [name]: visibel};
        const layerSelector = {...this.state.layerSelector, [name]: new RegExp(code)};
        const categories = [...this.state.categories, ...[name]];
        this.setState({categories, visibility, color, layerSelector});

        return fromJS({
            "id": code,
            "type": "fill",
            "metadata": {
                "mapbox:group": "f687f11d778ea9a47615d3f139a85ec5"
            },
            "source": "composite",
            "source-layer": source,
            "interactive": true,
            "filter": [
                "has",
                code
            ],
            "layout": {},
            "paint": {
                "fill-color": "hsla(251, 59%, 28%, 0.8)",
                "fill-outline-color": "hsla(251, 59%, 69%, 0.8)"
            }
        })
    }

    componentDidMount() {
        this._defaultLayers = defaultMapStyle.get('layers');
        //     .push(this.makeLayer("NA-T", "NA_T", true, "naturomrader6"))
        //     //.push(this.makeLayer("NA-M", "NA_M", true, "naturomrader6"));

        this._updateMapStyle(this.state);
    }

    _onClickAddLayer() {
        this._defaultLayers = this._defaultLayers
            .push(this.makeLayer(this.state.newLayer, this.state.newLayer, true, "naturomrader6"))
        this._updateMapStyle({...this.state});
    }

    _onColorChange(name, event) {
        const color = {...this.state.color, [name]: event.target.value};
        this.setState({color});
        this._updateMapStyle({...this.state, color});
    }

    _onVisibilityChange(name, event) {
        const visibility = {...this.state.visibility, [name]: event.target.checked};
        this.setState({visibility});
        this._updateMapStyle({...this.state, visibility});
    }

    _updateMapStyle({visibility, color, layerSelector}) {

        const layers = this._defaultLayers

            .filter(layer => {
                const id = layer.get('id');
                //console.log(id);
                return this.state.categories.every(name => visibility[name] || !layerSelector[name].test(id));
            })
            .map(layer => {
                const id = layer.get('id');
                const type = layer.get('type');
                const category = this.state.categories.find(name => layerSelector[name].test(id));
                //console.log(id + ", " + type + ", " + category);
                if (category && colorClass[type] && color[category]) {
                    //console.log("paint " + id + ", " + type + ", " + category);
                    return layer.setIn(['paint', colorClass[type]], color[category]);
                }
                // else {
                //     return layer.setIn(['layout', "visibility"], visibility[id]);
                // }
                return layer;
            });

        this.props.onChange(defaultMapStyle.set('layers', layers));
    }

    prepareNewLayer(evt) {
        this.setState({
            newLayer: evt.target.value
        });
    }

    _renderLayerControl(name) {
        const {visibility, color} = this.state;

        return (
            <div key={name} className="input">
                <label>{name}</label>
                <input type="checkbox" checked={visibility[name]}
                       onChange={this._onVisibilityChange.bind(this, name)} />
                <input type="color" value={color[name]} disabled={!visibility[name]}
                       onChange={this._onColorChange.bind(this, name)} />
            </div>
        );
    }

    render() {
        const Container = this.props.containerComponent || defaultContainer;

        return (
            <Container>
                <h3>Kartlag</h3>
                <p>Her kan du slå av/på lag og endre farger</p>
                <input value={this.state.newLayer} onChange={evt => this.prepareNewLayer(evt)}/>
                <input type="button" onClick={this._onClickAddLayer.bind(this)} value="+" />
                <hr />
                { this.state.categories.map(name => this._renderLayerControl(name)) }
            </Container>
        );
    }
}
