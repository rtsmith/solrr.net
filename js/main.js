var React = require('react');
var ReactDOM = require('react-dom');
var TrackPlayer = require('./TrackPlayer');

var client_id = "ceed35cb3c4ba8b5d498475ae6e966b6";

SC.initialize({
  client_id: client_id
});

$('.audio-player').each(function() {
  var data = $(this).data();
  ReactDOM.render(
    <TrackPlayer id={data.track_id} title={data.title} />,
    this
  );
});
