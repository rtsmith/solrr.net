var React = require('react')

var PlayToggle = (props) => {
  var trackClass = props.trackStatus === "playing" && props.id === props.idLoaded
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
