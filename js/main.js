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
        function setPlaying() {
            $element.find(".controls").addClass("playing");
        }
        function setPaused() {
            $element.find(".controls").removeClass("playing");
        }
        var $play_button = $('<a class="btn play"><span class="glyphicon glyphicon-play"></span></a>')
            .on('click', function() {
                streamer.play(track, setPlaying);
            });
        var $pause_button = $('<a class="btn pause"><span class="glyphicon glyphicon-pause"></span></a>')
            .on('click', function() {
                streamer.pause(track, setPaused);
            });
        var $controls = $('<div class="controls"></div>').append($play_button).append($pause_button);
        var meta = "<h4>Track Title - Artist</h4>";
        $element.append($controls).append(meta);
    }

    $('.art').height($(window).height());
});





