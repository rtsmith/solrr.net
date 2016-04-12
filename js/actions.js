var Reflux = require('reflux');

var Actions = Reflux.createActions([
  "trackToggle",
  "trackSeek",
  "updateStatus"
]);

Actions.dataLoad = Reflux.createAction({ asyncResult: true });
Actions.initTrack = Reflux.createAction({ asyncResult: true });
Actions.initTrackAndSeek = Reflux.createAction({ asyncResult: true });

Actions.dataLoad.listen(function(id) {
  SC.get(`/tracks/${id}`)
    .then(this.completed)
    .catch(this.failed)
});

Actions.initTrack.listen(function(id) {
  SC.stream(`/tracks/${id}`)
    .then(this.completed)
    .catch(this.failed)
});

Actions.initTrackAndSeek.listen(function(x, id) {
  SC.stream(`/tracks/${id}`)
    .then(this.completed)
    .catch(this.failed)
});

module.exports = Actions;
