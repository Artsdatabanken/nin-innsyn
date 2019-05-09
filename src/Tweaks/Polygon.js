import { SettingsContext } from "../SettingsContext";
import typesystem from "@artsdatabanken/typesystem";
import React, { Component } from "react";
import { withRouter } from "react-router";
import tinycolor from "tinycolor2";
import Barneliste from "./Barneliste";
import ColorPicker from "./ColorPicker";

class Polygon extends Component {
  render() {
    const {
      kode,
      farge,
      history,
      onMouseEnter,
      onMouseLeave,
      barn,
      lag,
      url
    } = this.props;
    const { location } = history;
    const undernivå = this.navnPåUndernivå(url);
    if (location.search.startsWith("?vis_barn")) {
      const egenskap = location.search.split("=").pop();
      const barnet = barn[egenskap];
      return (
        <ColorPicker
          tittel={"Fyllfarge"}
          color={barnet.farge}
          onChange={farge => {
            const rgbString = tinycolor(farge.rgb).toRgbString();
            this.props.onUpdateLayerProp(
              lag,
              "barn." + egenskap + ".farge",
              rgbString
            );
          }}
        />
      );
    }
    return (
      <SettingsContext.Consumer>
        {context => (
          <>
            <div class="sidebar_element">
              <h3 style={{ textTransform: "capitalize" }}>{undernivå}</h3>
              <ul className="ul_block">
                <Barneliste
                  forelderkode={kode}
                  visKoder={context.visKoder}
                  aktivtBarn={lag}
                  barn={barn}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  onUpdateLayerProp={(index, felt, verdi) => {
                    barn[index][felt] = verdi;
                    this.handleUpdateLayerProp(kode, "barn", barn);
                  }}
                />
              </ul>
            </div>

            {/* 
            <ColorPicker
              tittel={"Fyllfarge"}
              color={farge}
              onChange={farge => {
                const rgbString = tinycolor(farge.rgb).toRgbString();
                this.handleUpdateLayerProp(kode, "farge", rgbString);
              }}
            />
              */}
          </>
        )}
      </SettingsContext.Consumer>
    );
  }

  handleUpdateLayerProp = (kode, key, value) => {
    this.props.onUpdateLayerProp(kode, "kart.format.polygon." + key, value);
  };

  navnPåUndernivå(kode) {
    const nivåer = typesystem.hentNivaa(kode + "/x");
    if (nivåer.length <= 0) return "underelementer";
    const nivå = nivåer[0];
    return nivå.endsWith("e") ? nivå + "r" : nivå;
  }
}

export default withRouter(Polygon);
