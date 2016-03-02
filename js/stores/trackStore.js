var Reflux = require('reflux');
var Actions = require('../actions');

// trackStore:
// handles fetching track metadata from soundcloud

var trackStore = Reflux.createStore({
  listenables: Actions,
  onDataLoadCompleted: function(data) {
    this.trigger(data);
  },
  onDataLoadFailed: function(err) {
    console.error(err);
  }
});

module.exports = trackStore;
