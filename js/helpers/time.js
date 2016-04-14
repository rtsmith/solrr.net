var Time = function() {
  this.format = function(ms) {
    var pre;
    var s = ms / 1000;

    if (s / 3600 > 1) {
      pre = `${Math.floor(s / 3600)}:${(s % 3600) / 60 > 10 ? '' : 0}${Math.floor((s % 3600) / 60)}`;
    } else {
      pre = `${Math.floor(s / 60)}`;
    }

    return `${pre || 0}:${s % 60 > 10 ? '' : 0}${Math.floor(s % 60) || 0}`;
  }
}

module.exports = new Time;
