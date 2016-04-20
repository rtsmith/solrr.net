var React = require('react')

var PlayToggle = (props) => {
  var trackClass = props.state_data.trackStatus === "playing" && props.state_data.data.id === props.state_data.idLoaded
    ? "fa fa-pause" : "fa fa-play";
  return (
    <div className="play-toggle">
      <a onClick={props.onToggleClick}>
        <i className={trackClass}></i>
      </a>
    </div>
  )
};

module.exports = PlayToggle;
