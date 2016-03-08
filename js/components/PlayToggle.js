var React = require('react');

const PlayToggle = React.createClass({
  render: function() {
    const trackClass = this.props.track_data.idLoaded == this.props.id && this.props.track_data.isPlaying ? "fa fa-pause" : "fa fa-play";
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
