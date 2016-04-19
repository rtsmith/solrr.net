var React = require('react')
var Actions = require('../actions');
var Time = require('../helpers/time');

var SeekBar = React.createClass({
  listenSeek: function(event) {
    var rect = event.currentTarget.getBoundingClientRect();
    var relativePos = (event.clientX - rect.left) / rect.width;

    if (this.props.idLoaded === 0 || this.props.idLoaded !== this.props.id) {
      Actions.initTrack(this.props.id);
    } else {
      Actions.trackSeek(relativePos);
    }
  },

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
      <div onClick={this.listenSeek} className="seekbar" style={style}>
        <div className="seek-pos" style={seekStyle}></div>
        <span style={posStyle}>{pos}</span> 
        <span>{Time.format(this.props.duration)}</span>
      </div>
    )
  }
});

module.exports = SeekBar;
