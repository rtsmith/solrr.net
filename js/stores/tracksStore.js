var Reflux = require('reflux');
var Actions = require('../actions');

// tracksStore:
// handles state and logic between tracks.
// just pass entire "store" object in triggers

var tracksStore = Reflux.createStore({
  store: {},
  listenables: Actions,
  onTrackLoadCompleted: function(player) {
    // TODO deactivate loading icon here
    this.store.idLoaded = player.options.soundId;
    this.store.streamer = player;
    this.store.isPlaying = true;
    this.trigger(this.store);
  },
  onTrackLoadFailed: function(err) {
    console.error(err);
  },
  onTrackPlay: function() {
    // TODO move loadTrack logic here
    this.store.isPlaying = true;
    this.trigger(this.store);
  },
  onTrackStop: function() {
    this.store.isPlaying = false;
    this.trigger(this.store);
  }
});

module.exports = tracksStore;
