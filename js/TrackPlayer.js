var React = require('react');
var PlayProgress = require('./components/PlayProgress');
var PlayToggle = require('./components/PlayToggle');
var Boombox = require('./components/Boombox');
var TrackActions = require('./actions');
var PlayerStore = require('./stores/playerStore');
var TrackStore = require('./stores/trackStore');

var Logger = require('./components/logger');

// TrackPlayer component. UI for a single track
var TrackPlayer = React.createClass({
  getInitialState: function() {
    return {
      idLoaded: 0,
      trackStatus: 'none', // "none" (not loaded), "loading", "seeking", "idle" (loaded, stopped), "playing"
      seek: 0,
      streamer: {options: {duration: 0}},
      // track instance data:
      data: {}
    };
  },

  // we will want track data to be rendered serverside,
  // so use componentWillMount hook for this init load
  componentWillMount: function() {
    TrackActions.dataLoad(this.props.id);
    TrackStore.listen((data) => {
      if (data.id == this.props.id) {
        this.setState({ data: data });
      }
    });
  },

  componentDidMount: function() {
    // inform the track of the Player state
    PlayerStore.listen((track_state) => {
      this.setState(track_state);
    });
  },

  handlePlayToggle: function() {
    if (this.state.idLoaded !== this.props.id) {
      TrackActions.initTrack(this.state.data.id);
    }
    else {
      TrackActions.trackToggle(this.state.data.id)
    }
  },

  render: function() {
    return (
      <div className="track-player">
        <PlayToggle onToggleClick={this.handlePlayToggle} state_data={this.state} />
        <PlayProgress 
          id={this.state.data.id}
          idLoaded={this.state.idLoaded}
          duration={this.state.data.duration}
          seek={this.state.seek}
          trackStatus={this.state.trackStatus}
          waveUrl={this.state.data.waveform_url}
        />
      </div>
    );
  }
});

module.exports = TrackPlayer;
