var React = require('react');

const PlayProgress = (props) =>
  <div className="play-progress">
    <span>length: {props.duration}</span>
    <span>playing: {props.isPlaying.toString()}</span>
  </div>

module.exports = PlayProgress;
