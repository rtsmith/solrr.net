var React = require('react');
var PlayProgress = require('./PlayProgress');
var PlayToggle = require('./PlayToggle');

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
    // this.state.playing ? this.setState({playing: false}) : this.setState({playing: true});
    playerUpdate(this.props.id);
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
