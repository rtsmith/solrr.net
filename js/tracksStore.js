var Reflux = require('reflux');
var Actions = require('./actions');

var store = Reflux.createStore({
  listenables: Actions,
  onTrackPlay: function(track_state) {
    track_state.isPlaying = true;
    track_state.idLoaded = track_state.data.id
    this.trigger(track_state);
  },
  onTrackStop: function(track_state) {
    track_state.isPlaying = false;
    this.trigger(track_state);
  }
});

//
// BoomBox object:
// a singleton that plays SC object. subscribes to trackStore same way as TrackPlayer comp.
// It consumes state just like a component, but does not set it

function BoomBoxComponent() {
  var _currentPlayer;

  store.listen(function(track_state) {
    if (!(track_state.isPlaying)) {
      _currentPlayer.pause();
    }
    else if (track_state.isPlaying) {
      SC.stream(`/tracks/${track_state.data.id}`).then(function(player) {
        player.play();
        _currentPlayer = player;
      });
    }
  });
}

var boombox = new BoomBoxComponent();

module.exports = store;
