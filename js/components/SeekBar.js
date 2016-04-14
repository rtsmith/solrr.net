var React = require('react')
var Actions = require('../actions');

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
    var pos = Math.floor(this.props.seek / 1000);
    var relativePos = `${(this.props.seek / this.props.duration) * 100 || 0}%`;
    var style = {
      backgroundImage: `url(${this.props.wave_url})`,
      backgroundSize: "cover"
    }
    var seekStyle = {
      width: relativePos,
      display: pos > 0 ? "block" : "none"
    }
    return (
      <div onClick={this.listenSeek} className="seekbar" style={style}>
        <div className="seek-pos" style={seekStyle}></div>
        <span>{pos > 0 ? pos : '' }</span> 
      </div>
    )
  }
});

module.exports = SeekBar;
