$(function() {
    $('.audio-player').each( function(i) {
        initPlayer($(this))
    });
    function initPlayer($player) {
        var url = $player.data('track');
        var track = new Audioplayer(url);

        generateControls($player, track);
    }
    function generateControls($element, track) {
        var $play_button = $('<a class="btn play"><span class="glyphicon glyphicon-play"></span></a>')
            .on('click', function() {
                streamer.play(track);
            });
        var $pause_button = $('<a class="btn pause"><span class="glyphicon glyphicon-pause"></span></a>')
            .on('click', function() {
                streamer.pause();
            });
        var $controls = $('<div class="controls"></div>').append($play_button).append($pause_button);
        var meta = "<h4>Track Title - Artist</h4>";
        $element.append($controls).append(meta);
    }
});
