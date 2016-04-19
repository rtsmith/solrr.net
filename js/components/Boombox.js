var PlayerStore = require('../stores/playerStore');
var Actions = require('../actions');

//
// BoomBox component:

function BoomBoxComponent() {
  function play(store) {
    store.streamer.play();
  }

  function pause(store) {
    store.streamer.pause();
  }

  function seekTo(store) {
    var pos_ms = Math.floor(store.seek * store.streamer.options.duration);
    store.streamer.on("play-resume", listenPlay(store));
    store.streamer.seek(pos_ms);
  }

  function listenPlay(store) {
    store.streamer.off("play-resume", listenPlay);
    Actions.updateStatus("playing");
  }

  PlayerStore.listen(function(store) {
    switch(store.trackStatus) {
      case "seeking":
        seekTo(store);
        break;
      case "idle":
        pause(store);
        break;
      case "playing":
        play(store);
        break;
    }
  });
}

module.exports = new BoomBoxComponent();
