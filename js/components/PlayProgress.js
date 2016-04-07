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
    if (nextProps.state_data.idLoaded !== nextProps.state_data.data.id) { 
      this.clearTimer(); // if we switch a track, stop the timer on the previous one
      return; 
    }

    if (nextProps.state_data.trackStatus == "seeking" ) {
      let pos = nextProps.state_data.streamer.options.duration * nextProps.state_data.seek.pos;
      this.clearTimer();
      this.setState({seek: pos});
      return;
    }

    if (nextProps.state_data.trackStatus == "playing") {
      this.setState({interval: window.setInterval( this.incSeek, 100)});
    } else {
      this.clearTimer();
    }
  },

  clearTimer: function() {
    window.clearInterval(this.state.interval);
  },

  incSeek: function() {
   this.setState((state, props) => {
     return {seek: this.state.seek + 100}
   })
  },

  render: function() {
    return (
      <div className="play-progress">
        <SeekBar 
          id={this.props.state_data.data.id} 
          duration={this.props.state_data.data.duration} 
          seek={this.state.seek}
          wave_url={this.props.state_data.data.waveform_url}
        />
      </div>
    )
  }
});

module.exports = PlayProgress;
