var React = require('react');

const PlayProgress = (props) =>
  <div className="play-progress">
    <span>length: {props.track_data.data.duration}</span>
    <span>playing: {props.track_data.isPlaying.toString()}</span>
  </div>

module.exports = PlayProgress;
