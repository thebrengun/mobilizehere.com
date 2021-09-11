import React from "react";

class LegacyURLControl extends React.Component {
  render() {
    const { value } = this.props;

    return (
      <div className="css-1d8xcao">
        <span>
          {value ? `https://www.mobilizehere.com/${value}` : "No legacy URL"}
        </span>
      </div>
    );
  }
}

class LegacyURLPreview extends React.Component {
  render() {
    const value = this.props.value ? this.props.value : "";
    return "https://www.mobilizehere.com/" + value;
  }
}

const LegacyURL = ["Legacy URL", LegacyURLControl, LegacyURLPreview];

export default LegacyURL;
