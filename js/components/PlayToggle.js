var React = require('react');

const PlayToggle = (props) =>
  <div className="play-toggle">
    <a onClick={props.onToggleClick}>play button</a>
  </div>

module.exports = PlayToggle;
