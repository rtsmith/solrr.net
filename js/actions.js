var Reflux = require('reflux');

var Actions = Reflux.createActions([
  "trackLoad",
  "trackPlay",
  "trackStop"
]);

Actions.trackLoad = Reflux.createAction({ asyncResult: true });
Actions.trackLoad.listen(function(id) {
  // TODO activate loading icon here
  SC.stream(`/tracks/${id}`)
    .then(this.completed)
    .catch(this.failed)
});

module.exports = Actions;
