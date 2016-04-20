var Reflux = require('reflux');
var Actions = require('../actions');

// tracksStore:
// mutates state between tracks.
// just pass entire "store" object in triggers

var playerStore = Reflux.createStore({
  store: {},
  listenables: Actions,

  getInitialState: function() {
    return {
      idLoaded: 0,
      trackStatus: 'none', // "none" (not loaded), "loading", "seeking", "idle" (loaded, stopped), "playing"
      seek: 0,
      streamer: {options: {duration: 0}},
      // track instance data:
      data: {}
    };
  },

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
