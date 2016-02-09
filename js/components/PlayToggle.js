var React = require('react');

const PlayToggle = (props) =>
  // if props.playing change sign
  <div className="play-toggle">
    <a onClick={props.onToggleClick}>play button</a>
  </div>

module.exports = PlayToggle;
