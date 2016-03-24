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
      seek: 0,
      trackStatus: 'none', // "none" (not loaded), "loading", "idle" (loaded, stopped), "playing"
      streamer: {},
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
    PlayerStore.listen((playerState) => {

      this.setState({playerState: playerState});
    });
  },

  handlePlayToggle: function() {
    TrackActions.trackToggle(this.state.data.id)
  },

  render: function() {
    return (
      <div className="track-player">
        {/* use a title we provide */}
        <h4>{this.props.title}</h4>
        <PlayToggle onToggleClick={this.handlePlayToggle} state_data={this.state} />
        <PlayProgress state_data={this.state} />
      </div>
    );
  }
});

module.exports = TrackPlayer;
