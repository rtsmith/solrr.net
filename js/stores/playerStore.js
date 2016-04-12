var Reflux = require('reflux');
var Actions = require('../actions');

// tracksStore:
// mutates state between tracks.
// just pass entire "store" object in triggers

var playerStore = Reflux.createStore({
  store: {},
  listenables: Actions,

  onInitTrack: function() {
    this.store.trackStatus = "loading";
    this.trigger(this.store);
  },

  onInitTrackCompleted: function(player) {
    this.store.streamer = player;
    this.store.idLoaded = player.options.soundId;
    this.store.trackStatus = "playing";
    this.trigger(this.store);
  },

  onInitTrackAndSeek: function(x, id) {
    this.store.trackStatus = "loading";
    this.store.seek = x;
    this.trigger(this.store);
  },

  onInitTrackAndSeekCompleted: function(player) {
    this.store.streamer = player;
    this.store.idLoaded = player.options.soundId;
    this.store.trackStatus = "seeking";
    this.trigger(this.store);
  },

  onTrackInitFailed: function(err) {
    console.error(err);
  },

  onTrackToggle: function(id) {
    if (this.store.trackStatus === "playing") {
      this.store.trackStatus = "idle";
    } 
    else if (this.store.trackStatus === "idle") {
      this.store.trackStatus = "playing";
    } 
    this.trigger(this.store);
  },

  onTrackSeek: function(x) {
    this.store.seek = x;
    this.store.trackStatus = "seeking";
    this.trigger(this.store);
  },

  onUpdateStatus: function(status) {
    this.store.trackStatus = status;
    this.trigger(this.store);
  },
});

module.exports = playerStore;
