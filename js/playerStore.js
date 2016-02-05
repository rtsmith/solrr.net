var Reflux = require('reflux');
var Actions = require('./actions');

// only the store knows what track is playing,
// other tracks should not.
var store = Reflux.createStore({
  listenables: Actions,
  onPlayToggle: function(track_id) {
    console.log(track_id);
  }
});

module.exports = store;
