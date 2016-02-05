var React = require('react');
// react components
var PlayProgress = require('./components/PlayProgress');
var PlayToggle = require('./components/PlayToggle');
// reflux 
var PlayerActions = require('./actions');
var PlayerStore = require('./playerStore');


// a track only needs to know if it's playing and if so
// what seek position
var TrackPlayer = React.createClass({
  getInitialState: function() {
    return {
      playing: false,
      data: {}
    };
  },

  componentDidMount: function() {
    var self = this;
    SC.get(`/tracks/${this.props.id}`).then(function(data) {
      self.setState({data: data});
    }).catch(function(error) {
      console.error(self.props.url, status, error.message);
    });
  },

  handleToggle: function() {
    PlayerActions.playToggle(this.state.data.title);
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
