var Actions = require('../actions');
var TracksStore = require('../stores/tracksStore');

//
// BoomBox object:
// a singleton that manipulates SC object kept in the streamStore.
// it just listens and fires no actions of its own

function BoomBoxComponent() {
  TracksStore.listen(function(store) {
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
