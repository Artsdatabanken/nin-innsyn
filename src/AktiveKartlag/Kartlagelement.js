import språk from "språk";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import React from "react";
import { withRouter } from "react-router";

class Kartlagelement extends React.Component {
  render() {
    const {
      tittel,
      undertittel,
      kode,
      farge,
      onMouseLeave,
      onMouseEnter,
      onClick
    } = this.props;
    return (
      <div className="child_list_object">
        <button
          className="grouped_items_button"
          onClick={() => onClick(kode)}
          key={kode}
          onMouseEnter={() => onMouseEnter({ kode })}
          onMouseLeave={() => {
            onMouseLeave();
          }}
        >
          <div className="title_and_subtitle_container">
            <h4>{språk(tittel)}</h4>
            <h5>{språk(undertittel)}</h5>
          </div>

          <div
            className="colour_legend"
            style={{
              backgroundColor: farge,
              src: !farge && "/" + kode + ".png"
            }}
          />
        </button>
        <button
          className="invisible_icon_button show_hide_button"
          onClick={e => {
            this.props.onUpdateLayerProp(
              kode,
              "erSynlig",
              !this.props.erSynlig
            );
            e.stopPropagation();
          }}
        >
          {this.props.erSynlig ? (
            <VisibilityOutlined />
          ) : (
            <VisibilityOffOutlined style={{ color: "#aaa" }} />
          )}
        </button>
      </div>
    );
  }
}

export default withRouter(Kartlagelement);
