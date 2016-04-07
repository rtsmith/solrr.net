var PlayerStore = require('../stores/playerStore');
var Actions = require('../actions');

//
// BoomBox component:
// a singleton that manipulates SC object kept in the streamStore.
// it just listens and fires no actions of its own
//
// TODO the SC player sends a .swf rather than html5 audio
// if the track is very long, check if client has flash

function BoomBoxComponent() {
  function play(store) {
    store.streamer.play();
  }

  function pause(store) {
    store.streamer.pause();
  }

  function seek_to(store) {
    var pos_ms = Math.floor(store.seek.pos * store.streamer.options.duration);
    store.streamer.seek(pos_ms);
    Actions.updateStatus("playing");
  }

  PlayerStore.listen(function(store) {
    if (store.trackStatus == "seeking") {
      seek_to(store);
    } 
    else if (store.trackStatus == "idle") {
      pause(store);
    }
    else if (store.trackStatus == "loading" || "playing") {
      play(store);
    }
  });
}

module.exports = new BoomBoxComponent();
