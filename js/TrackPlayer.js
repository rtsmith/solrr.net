var React = require('react');
var PlayProgress = require('./components/PlayProgress');
var PlayToggle = require('./components/PlayToggle');
var TrackActions = require('./actions');
var TracksStore = require('./tracksStore');


// playerUI just needs to send what track it is and what
// actions correspond to what buttons pressed
var TrackPlayer = React.createClass({
  getInitialState: function() {
    // sync doesnt happen here!
    return {
      idLoaded: 0,
      seek: 0,
      isPlaying: false,
      data: {}
    };
  },

  // we will want track data to be rendered serverside,
  // so use componentWillMount hook for this init load
  componentWillMount: function() {
    var self = this;
    SC.get(`/tracks/${this.props.id}`).then(function(data) {
      self.setState({data: data});
    }).catch(function(error) {
      console.error(self.props.url, status, error.message);
    });
  },

  componentDidMount: function() {
    TracksStore.listen(function(track_state) {
      this.setState(track_state);
    }.bind(this));
  },

  handlePlayToggle: function() {
    this.state.isPlaying ?
      TrackActions.trackStop(this.state)
    : TrackActions.trackPlay(this.state)
  },

  render: function() {
    return (
      <div className="track-player">
        {/* use a title we provide */}
        <h4>{this.props.title}</h4>
        <PlayToggle onToggleClick={this.handlePlayToggle} isPlaying={this.state.isPlaying} />
        <PlayProgress duration={this.state.data.duration} isPlaying={this.state.isPlaying} />
      </div>
    );
  }
});

module.exports = TrackPlayer;
