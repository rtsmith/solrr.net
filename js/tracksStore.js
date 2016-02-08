var Reflux = require('reflux');
var Actions = require('./actions');

var store = Reflux.createStore({
  listenables: Actions,
  onPlayToggle: function(track_id) {
    this.trigger(track_id);
  }
});

module.exports = store;
