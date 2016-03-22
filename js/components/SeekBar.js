var React = require('react')
var Actions = require('../actions');

var SeekBar = React.createClass({
  listenSeek: function(event) {
    Actions.trackSeek(event.clientX, this.props.id);
  },
  render: function() {
    var pos = this.props.seek / this.props.duration;
    return (
      <div onClick={this.listenSeek} >
        <span style={{width: pos + "%"}}>length: {this.props.duration}</span>
        <div>{pos}</div>
      </div>
    )
  }
});

module.exports = SeekBar;
