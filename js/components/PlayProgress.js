var React = require('react');
var SeekBar = require('./SeekBar');

// playProgress is a component that displays seek position
// and emits new seek position on click within the seek box.
// Since the SC audio-manager keeps its own playback position for each
// player, these two seek positions are decoupled

var PlayProgress = React.createClass({
  getInitialState: function() {
    return {
      seek: 0,
      interval: null
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.state_data.trackStatus == "playing" && nextProps.state_data.idLoaded == nextProps.state_data.data.id) {
      this.interval = window.setInterval( this.incSeek, 100)
    } else {
      window.clearInterval(this.interval);
    }
  },

  incSeek: function() {
   this.setState((state, props) => {
     return {seek: this.state.seek + 100}
   })
  },

  render: function() {
    return (
      <div className="play-progress">
        <SeekBar duration={this.props.state_data.data.duration} seek={this.state.seek} />
      </div>
    )
  }
});

module.exports = PlayProgress;
