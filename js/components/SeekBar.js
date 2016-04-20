var React = require('react')
var Time = require('../helpers/time');

var SeekBar = (props) => {
  var pos = Time.format(props.seek) || '';
  var relativePos = `${(props.seek / props.duration) * 100 || 0}%`;
  var style = {
    backgroundImage: `url(${props.wave_url})`,
    backgroundSize: "cover"
  };
  var posStyle = {
    display: props.seek > 0 ? "inline" : "none"
  };
  var seekStyle = {
    width: relativePos,
    display: props.seek > 0 ? "block" : "none"
  };

  return (
    <div onClick={props.listenSeek} className="seekbar" style={style}>
      <div className="seek-pos" style={seekStyle}></div>
      <span style={posStyle}>{pos}</span>
      <span>{Time.format(props.duration)}</span>
    </div>
  )
};

module.exports = SeekBar;
