var React = require('react')
var Time = require('../helpers/time');

var SeekBar = React.createClass({

  render: function() {
    var pos = Time.format(this.props.seek) || '';
    var relativePos = `${(this.props.seek / this.props.duration) * 100 || 0}%`;
    var style = {
      backgroundImage: `url(${this.props.wave_url})`,
      backgroundSize: "cover"
    };
    var posStyle = {
      display: this.props.seek > 0 ? "inline" : "none"
    };
    var seekStyle = {
      width: relativePos,
      display: this.props.seek > 0 ? "block" : "none"
    };
    return (
      <div onClick={this.props.listenSeek} className="seekbar" style={style}>
        <div className="seek-pos" style={seekStyle}></div>
        <span style={posStyle}>{pos}</span> 
        <span>{Time.format(this.props.duration)}</span>
      </div>
    )
  }
});

module.exports = SeekBar;
