var Reflux = require('reflux');

var Actions = Reflux.createActions([
  "trackResume",
  "trackStop"
]);

Actions.dataLoad = Reflux.createAction({ asyncResult: true });
Actions.trackLoad = Reflux.createAction({ asyncResult: true });
Actions.trackInit = Reflux.createAction({ asyncResult: true });

Actions.dataLoad.listen(function(id) {
  SC.get(`/tracks/${id}`)
    .then(this.completed)
    .catch(this.failed)
});

Actions.trackInit.listen(function(id) {
  // TODO activate loading icon here
  SC.stream(`/tracks/${id}`)
    .then(this.completed)
    .catch(this.failed)
});

// Actions.trackLoaded.listen(

module.exports = Actions;
