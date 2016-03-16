var Reflux = require('reflux');
var Actions = require('../actions');

// tracksStore:
// handles state and logic between tracks.
// just pass entire "store" object in triggers

var playerStore = Reflux.createStore({
  store: {},
  listenables: Actions,
  onTrackLoadCompleted: (player) => {
    // trackload has really just begun here..
    this.store.idLoaded = player.options.soundId;
    this.store.streamer = player;
    this.store.isPlaying = true;
    this.trigger(this.store);
  },
  onTrackLoadFailed: (err) => {
    console.error(err);
  },
  onTrackPlay: () => {
    // TODO move loadTrack logic here
    this.store.isPlaying = true;
    this.trigger(this.store);
  },
  onTrackStop: () => {
    this.store.isPlaying = false;
    this.trigger(this.store);
  }
});

module.exports = playerStore;
