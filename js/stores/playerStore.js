var Reflux = require('reflux');
var Actions = require('../actions');

// tracksStore:
// mutates state between tracks.
// just pass entire "store" object in triggers

var playerStore = Reflux.createStore({
  store: {},
  listenables: Actions,
  onTrackInitCompleted: function(player) {
    // track buffering has really just begun here
    this.store.idLoaded = player.options.soundId;
    this.store.streamer = player;
    this.store.trackStatus = "loading";

    // set listener to update track status once the track actually starts playing:
    this.store.streamer.on('play-resume', this.listenForPlay);
    this.trigger(this.store);
  },

  onTrackInitFailed: function(err) {
    console.error(err);
  },

  onTrackToggle: function(id) {
    if (id !== this.store.idLoaded) {
      Actions.trackInit(id); return;
    }
    else if (this.store.trackStatus == "playing") {
      this.store.trackStatus = "idle";
    } 
    else if (this.store.trackStatus == "idle") {
      this.listenForPlay();
      return;
    } 
    else { 
      console.log(this.store.trackStatus); return; 
    }
    this.trigger(this.store);
  },

  onTrackSeek: function(x, id) {
    // TODO: handle first click and load if not loaded

    this.store.seek = x;
    this.store.trackStatus = "seeking";
    this.trigger(this.store);
  },

  listenForPlay: function() {
    this.store.trackStatus = "playing";
    this.trigger(this.store);
    // this.store.streamer.off('play-resume', this.listenForPlay);
  }
});

module.exports = playerStore;
