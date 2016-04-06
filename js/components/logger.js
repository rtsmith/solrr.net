var PlayerStore = require('../stores/playerStore');
var TrackStore = require('../stores/trackStore');

function Logger() {
  PlayerStore.listen((store) => {
    console.log(`status: ${store.trackStatus} \n streamer_id: ${store.streamer.options.soundId}`);
    if (store.trackStatus == "seeking") {
      console.log(` relative seek: ${store.seek.pos} : ${store.seek.id}`);
    }
  });

  TrackStore.listen((store) => {
//     console.log("TrackStore");
//     console.log(store);
  });
}

module.exports = new Logger;
