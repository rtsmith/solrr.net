var client_id = "ceed35cb3c4ba8b5d498475ae6e966b6";

function Audioplayer(sc_url) {
    this.url = sc_url;
    this.endpoint = "http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/" + this.url + "&client_id=" + client_id;
}
Audioplayer.prototype.resolve_callback = function(data) {
    this.track_id = data.id;
    this.track_title = data.title;
    this.artist = data.user.username;
}
Audioplayer.prototype.resolve = function() {
    var that = this;
    var result = $.get( this.endpoint, function(data ) { that.resolve_callback(data) } ); 
}

var track1 = new Audioplayer("mezla/mini-fuge");

track1.resolve();
