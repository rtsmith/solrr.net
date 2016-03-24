var React = require('react')
var Actions = require('../actions');

var SeekBar = React.createClass({
  listenSeek: function(event) {
    var rect = event.currentTarget.getBoundingClientRect();
    var relative_pos = (event.clientX - rect.left) / rect.width;
    Actions.trackSeek(relative_pos, this.props.id);
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
