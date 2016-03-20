var Actions = require('../actions');
var PlayerStore = require('../stores/playerStore');

//
// BoomBox component:
// a singleton that manipulates SC object kept in the streamStore.
// it just listens and fires no actions of its own

function BoomBoxComponent() {
  // TODO the SC player sends a .swf rather than html5 audio
  // if the track is very long, check if client has flash
  PlayerStore.listen(function(store) {
    if (store.trackStatus == "idle") {
      store.streamer.pause();
    }
    else if (store.trackStatus == "loading" || "playing") {
      store.streamer.play();
    }
  });
}

module.exports = new BoomBoxComponent();
