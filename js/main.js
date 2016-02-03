var React = require('react');
var ReactDOM = require('react-dom');
var client_id = "ceed35cb3c4ba8b5d498475ae6e966b6";
SC.initialize({
  client_id: client_id
});

var TrackPlayer = React.createClass({
  getInitialState: function() {
    return {
      playing: false,
      data: {}
    };
  },
  handleToggle: function() {
    this.state.playing ? this.setState({playing: false}) : this.setState({playing: true});
  },
  componentDidMount: function() {
    var self = this;
    SC.get(`/tracks/${this.props.id}`).then(function(data) {
      self.setState({data: data});
    }).catch(function(error) {
      console.error(self.props.url, status, error.message);
    });
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

// try out stateless components
const PlayToggle = (props) =>
  <div className="play-toggle">
    <a onClick={props.onToggleClick}>play button</a>
  </div>

const PlayProgress = (props) =>
  <div className="play-progress">
    <span>length: {props.data.duration}</span>
    <span>playing: {props.playing.toString()}</span>
  </div>

$('.audio-player').each(function() {
  var data = $(this).data();
  ReactDOM.render(
    <TrackPlayer id={data.track_id} title={data.title} />,
    this
  );
});

