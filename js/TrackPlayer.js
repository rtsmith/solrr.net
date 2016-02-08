var React = require('react');
var PlayProgress = require('./components/PlayProgress');
var PlayToggle = require('./components/PlayToggle');
var TrackActions = require('./actions');
var TracksStore = require('./tracksStore');


// a track only needs to know if it's playing and if so
// what seek position
var TrackPlayer = React.createClass({
  getInitialState: function() {
    return {
      playing: false,
      data: {}
    };
  },

  // we will want track data to be rendered serverside,
  // so use componentWillMount hook
  componentWillMount: function() {
    var self = this;
    SC.get(`/tracks/${this.props.id}`).then(function(data) {
      self.setState({data: data});
    }).catch(function(error) {
      console.error(self.props.url, status, error.message);
    });
  },

  // TODO this can be a pure function
  willPlay: function(id) {
    return this.state.data.id == id && !this.state.playing ? true : false;
  },

  componentDidMount: function() {
    var self = this;
    TracksStore.listen(function(id) {
      self.setState({ playing: self.willPlay(id) });
    });
  },

  handleToggle: function() {
    TrackActions.playToggle(this.state.data.id);
  },

  render: function() {
    return (
      <div className="track-player">
        {/* use a title we provide */}
        <h4>{this.props.title}</h4>
        <PlayToggle onToggleClick={this.handleToggle} />
        <PlayProgress data={this.state.data} playing={this.state.playing}/>
      </div>
    );
  }
});

module.exports = TrackPlayer;
