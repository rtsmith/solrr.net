var client_id = "ceed35cb3c4ba8b5d498475ae6e966b6";

function Audioplayer(sc_url) {
    this.sound = {};
    this.url = sc_url;
    this.endpoint = "http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/" + this.url + "&client_id=" + client_id;
    this.resolve();
}
Audioplayer.prototype.resolve_callback = function(data) {
    this.track_id = data.id;
    this.track_title = data.title;
    this.artist = data.user.username;
    // used for passing passing into the streamer
    this.api_track_url = "/tracks/" + this.track_id;
}
Audioplayer.prototype.resolve = function() {
    var that = this;
    $.get( this.endpoint, function(data) { that.resolve_callback(data) } ); 
}

// Sound manager /////////////////////////////////////////////////////////////////////
var streamer = {
    current_sound : {},
    play : function(track, callback) {
        var that = this;

        // 
        if (that.current_sound.playState === 1 && that.current_sound.sID === track.sound.sID) {
            that.resume(callback);
            return
        }

        SC.stream(track.api_track_url, function(sound) {
            sound.play();
            // assign Audioplayer the sound
            track.sound = sound;
            // assign SoundManager the Audioplayer's sound as current sound
            that.current_sound = track.sound;
            callback();
        });
    },
    resume : function(callback) {
        this.current_sound.resume();
        callback();
    },
    pause : function(callback) {
        this.current_sound.pause();
        callback();
    }
}
