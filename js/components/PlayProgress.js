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
    if (nextProps.idLoaded !== nextProps.id) { 
      this.clearTimer(); // if we switch a track, stop the timer on the previous one
      this.setState({seek: 0});
      return; 
    }

    if (nextProps.trackStatus == "seeking" ) {
      let pos = nextProps.duration * nextProps.seek;
      this.clearTimer();
      this.setState({seek: pos});
      return;
    }

    if (nextProps.trackStatus == "playing") {
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
          duration={this.props.duration}
          id={this.props.id} 
          idLoaded={this.props.idLoaded}
          seek={this.state.seek}
          wave_url={this.props.waveUrl}
        />
      </div>
    )
  }
});

module.exports = PlayProgress;
