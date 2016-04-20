var React = require('react');
var Reflux = require('reflux');
var PlayProgress = require('./components/PlayProgress');
var PlayToggle = require('./components/PlayToggle');
var Boombox = require('./components/Boombox');
var TrackActions = require('./actions');
var PlayerStore = require('./stores/playerStore');
var TrackStore = require('./stores/trackStore');

var Logger = require('./components/logger');

// TrackPlayer, top level component
var TrackPlayer = React.createClass({
  mixins: [Reflux.connect(PlayerStore)],

  // we will want track data to be rendered serverside,
  // so use componentWillMount hook for this init load
  componentWillMount: function() {
    TrackActions.dataLoad(this.props.id);
    TrackStore.listen((data) => {
      if (data.id === this.props.id) {
        this.setState({ data: data });
      }
    });
  },

  handlePlayToggle: function() {
    if (this.state.idLoaded !== this.props.id) {
      TrackActions.initTrack(this.props.id);
    }
    else {
      TrackActions.trackToggle(this.props.id)
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
