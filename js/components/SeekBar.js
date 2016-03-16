var React = require('react')

var SeekBar = React.createClass({
  render: function() {
    var pos = this.props.seek / this.props.duration;
    return (
      <div>
        <span style={{width: pos + "%"}}>length: {this.props.duration}</span>
        <div>{pos}</div>
      </div>
    )
  }
});

module.exports = SeekBar;
