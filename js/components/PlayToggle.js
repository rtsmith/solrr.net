var React = require('react');

const PlayToggle = React.createClass({

  render: function() {
    const trackPlaying = this.props.track_data.idLoaded == this.props.id && this.props.track_data.isPlaying ? "playing" : "stopped";
    return (
      <div className={trackPlaying}>
        <a onClick={this.props.onToggleClick}>play button</a>
      </div>
    )
  }
});
module.exports = PlayToggle;
