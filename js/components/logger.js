var PlayerStore = require('../stores/playerStore');
var TrackStore = require('../stores/trackStore');

function Logger() {
  PlayerStore.listen((store) => {
    if (store.trackStatus === "loading") {
      console.log(`status: loading \n`);
    }
    else if (store.trackStatus === "idle" || store.trackStatus === "playing") {
      console.log(`status: ${store.trackStatus} \n streamer_id: ${store.streamer.options.soundId}`);
    }
    else if (store.trackStatus == "seeking") {
      console.log(` relative seek: ${store.seek}`);
    }
  });

  TrackStore.listen((store) => {
//     console.log("TrackStore");
//     console.log(store);
  });
}

module.exports = new Logger;
