var React = require('react');
var PlayProgress = require('./components/PlayProgress');
var PlayToggle = require('./components/PlayToggle');
var Boombox = require('./components/Boombox');
var TrackActions = require('./actions');
var PlayerStore = require('./stores/playerStore');
var TrackStore = require('./stores/trackStore');


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
    PlayerStore.listen((track_state) => {
      this.setState(track_state);
    });
  },

  /* The PlayerStore handles mutating player state, not component */
  handlePlayToggle: function() {
    if (this.state.idLoaded !== this.state.data.id) {
      TrackActions.trackInit(this.state.data.id);
      console.log("track ---- load");
    } 
    else { TrackActions.trackToggle() }
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
