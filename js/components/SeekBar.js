var React = require('react')
var Actions = require('../actions');

var SeekBar = React.createClass({
  listenSeek: function(event) {
    var rect = event.currentTarget.getBoundingClientRect();
    var relativePos = (event.clientX - rect.left) / rect.width;

    if (this.props.idLoaded === 0 || this.props.idLoaded !== this.props.id) {
      Actions.initTrack(this.props.id);
      return;
    }

    Actions.trackSeek(relativePos);
  },

  render: function() {
    var pos = this.props.seek;
    var style = {
      backgroundImage: `url(${this.props.wave_url})`,
      backgroundSize: "contain"
    }
    return (
      <div onClick={this.listenSeek} style={style} className="seekbar">
        <span>{pos / 1000}</span> 
      </div>
    )
  }
});

module.exports = SeekBar;
