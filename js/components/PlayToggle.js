var React = require('react');

const PlayToggle = React.createClass({
  render: function() {
    const trackClass = this.props.isTrackPlaying() ? "fa fa-pause" : "fa fa-play";
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
