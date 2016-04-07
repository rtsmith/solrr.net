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

    this.store.streamer = player;
    this.store.trackStatus = "loading";

    // set listener to update track status once the track actually starts playing:
    this.store.streamer.on('play-resume', this.listenForPlay);
    this.trigger(this.store);
    console.log("LOAD TRIGGER");
  },

  onTrackInitFailed: function(err) {
    console.error(err);
  },

  onTrackToggle: function(id) {
    if (id !== this.store.idLoaded) {
      Actions.trackInit(id);
      this.store.idLoaded = id;
    }
    else if (this.store.trackStatus == "playing") {
      this.store.trackStatus = "idle";
      this.store.streamer.on('play-resume', this.listenForPlay);
    } 
    else if (this.store.trackStatus == "idle") {
      this.store.trackStatus = "playing";
      this.store.streamer.off('play-resume', this.listenForPlay);
    } 
    this.trigger(this.store);
    console.log("TOGGLE TRIGGER");
  },

  onTrackSeek: function(x, id) {
    // TODO: handle first click and load if not loaded
    if (id !== this.store.idLoaded) { 
      Actions.trackInit(id);
      this.store.idLoaded = id;
    }

    this.store.seek = { pos: x, id: id};
    this.store.trackStatus = "seeking";
    this.trigger(this.store);
  },

  onUpdateStatus: function(status) {
    this.store.trackStatus = status;
    this.trigger(this.store);
  },

  listenForPlay: function() {
    this.store.trackStatus = "playing";
    this.trigger(this.store);
    this.store.streamer.off('play-resume', this.listenForPlay);
    console.log("LISTEN TRIGGER");
  }
});

module.exports = playerStore;
