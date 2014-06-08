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
        var $play_button = $('<a class="btn">Play1</a>')
            .on('click', function() {
                streamer.play(track);
            });
        var $pause_button = $('<a class="btn">Pause1</a>')
            .on('click', function() {
                streamer.pause();
            });
        var $controls = $('<div class="controls"></div>').append($play_button).append($pause_button);
        $element.append($controls);
    }
});
