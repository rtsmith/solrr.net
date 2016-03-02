var Actions = require('../actions');
var PlayerStore = require('../stores/playerStore');

//
// BoomBox object:
// a singleton that manipulates SC object kept in the streamStore.
// it just listens and fires no actions of its own

function BoomBoxComponent() {
  // TODO the SC player sends a .swf rather than html5 audio
  // if the track is very long, check if client has flash
  PlayerStore.listen(function(store) {
    // key really ought to be called "shouldPlay"
    if (!(store.isPlaying)) {
      store.streamer.pause();
    }
    else if (store.isPlaying) {
      store.streamer.play();
    }
  });
}

module.exports = new BoomBoxComponent();
