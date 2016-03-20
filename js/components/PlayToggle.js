var React = require('react');

const PlayToggle = React.createClass({
  render: function() {
    const trackClass = this.props.state_data.trackStatus == "playing" && this.props.state_data.data.id == this.props.state_data.idLoaded
      ? "fa fa-pause" : "fa fa-play";
    return (
      <div className="play-toggle">
        <a onClick={this.props.onToggleClick}>
          <i className={trackClass}></i>
        </a>
      </div>
    )
  }
});
module.exports = PlayToggle;
