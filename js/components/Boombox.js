var PlayerStore = require('../stores/playerStore');

//
// BoomBox component:
// a singleton that manipulates SC object kept in the streamStore.
// it just listens and fires no actions of its own
//
// TODO the SC player sends a .swf rather than html5 audio
// if the track is very long, check if client has flash

function BoomBoxComponent() {
  let status;
  
  function play(store) {
    // keep a local state if track is playing
    if (status !== "playing") {
      store.streamer.play();
      status = "playing";
    }
  }

  function pause(store) {
    store.streamer.pause();
    status = "paused";
  }

  function seek_to(store) {
    var pos_ms = Math.floor(store.seek * store.streamer.options.duration);
    store.streamer.seek(pos_ms);
    play(store);
  }

  PlayerStore.listen(function(store) {
    if (store.trackStatus == "seeking") {
      seek_to(store);
      return;
    }

    if (store.trackStatus == "idle") {
      pause(store);
    }
    else if (store.trackStatus == "loading" || "playing") {
      play(store);
    }
  });
}

module.exports = new BoomBoxComponent();
