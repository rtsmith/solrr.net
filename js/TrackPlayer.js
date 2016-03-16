var React = require('react');
var PlayProgress = require('./components/PlayProgress');
var PlayToggle = require('./components/PlayToggle');
var Boombox = require('./components/Boombox');
var TrackActions = require('./actions');
var PlayerStore = require('./stores/playerStore');
var TrackStore = require('./stores/trackStore');


// playerUI just needs to send what track it is and what
// actions correspond to what buttons pressed
var TrackPlayer = React.createClass({
  getInitialState: function() {
    // sync doesnt happen here!
    return {
      idLoaded: 0,
      seek: 0,
      isPlaying: false, // Boombox comp is playing? only one track can be playing at a time
      streamer: {},
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
    PlayerStore.listen((track_state) => {
      // setState merges objects, so state.data remains
      // the same as long as the store doesn't send it
      this.setState(track_state);
    });
  },

  handlePlayToggle: function() {
    if (this.state.isPlaying) {
      // track is playing, stop track
      TrackActions.trackStop();
    } else if (this.state.idLoaded == this.state.data.id) {
      // track is not playing and is loaded, play track
      TrackActions.trackPlay();
    } else {
      // track is not playing as is not loaded, load track
      TrackActions.trackLoad(this.state.data.id);
    }
  },

  thisTrackPlaying: function() {
    return this.state.idLoaded == this.state.data.id && this.state.isPlaying ? true : false;
  },

  render: function() {
    return (
      <div className="track-player">
        {/* use a title we provide */}
        <h4>{this.props.title}</h4>
        <PlayToggle onToggleClick={this.handlePlayToggle} isTrackPlaying={this.thisTrackPlaying} />
        <PlayProgress track_data={this.state} isTrackPlaying={this.thisTrackPlaying} />
      </div>
    );
  }
});

module.exports = TrackPlayer;
