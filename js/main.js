var React = require('react');
var ReactDOM = require('react-dom');
var client_id = "ceed35cb3c4ba8b5d498475ae6e966b6";
SC.initialize({
  client_id: client_id
});

var TrackPlayer = React.createClass({
  getInitialState: function() {
    return {data: {}};
  },
  componentDidMount: function() {
    var self = this;
    // need to skip url resolution if ID provided
    SC.resolve(`http://soundcloud.com/${this.props.url}`).then((track) => {
      return SC.get(`/tracks/${track.id}`);
    }).then(function(data) {
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
        <PlayToggle />
        <PlayProgress data={this.state.data} />
      </div>
    );
  }
});

// try out stateless components
const PlayToggle = () =>
  <div className="play-toggle">
    <a>play button</a>
  </div>

const PlayProgress = (props) =>
  <div className="play-progress">
    <span>length: {props.data.duration}</span>
  </div>

$('.audio-player').each(function() {
  var data = $(this).data();
  ReactDOM.render(
    <TrackPlayer url={data.url} id={data.id} title={data.title} />,
    this
  );
});

