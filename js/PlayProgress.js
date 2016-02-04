var React = require('react');

const PlayProgress = (props) =>
  <div className="play-progress">
    <span>length: {props.data.duration}</span>
    <span>playing: {props.playing.toString()}</span>
  </div>

module.exports = PlayProgress;
