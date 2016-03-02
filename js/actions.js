var Reflux = require('reflux');

var Actions = Reflux.createActions([
  "trackPlay",
  "trackStop"
]);

Actions.trackLoad = Reflux.createAction({ asyncResult: true });
Actions.dataLoad = Reflux.createAction({ asyncResult: true });

Actions.trackLoad.listen(function(id) {
  // TODO activate loading icon here
  SC.stream(`/tracks/${id}`)
    .then(this.completed)
    .catch(this.failed)
});

Actions.dataLoad.listen(function(id) {
  SC.get(`/tracks/${id}`)
    .then(this.completed)
    .catch(this.failed)
});

module.exports = Actions;
