    // $('.audio-player').each( function(i) {
    //     var url = $(this).data('track');
    //     new Audioplayer(url);
    // });
$(function() {
    $('.audio-player').each( function(i) {
        initPlayer($(this))
    });
    function initPlayer($player) {
        var url = $player.data('track');
        var track = new Audioplayer(url);
        var $play_button = $player.find('.btn.play');
        var $pause_button = $player.find('.btn.pause');

        $play_button.on('click', function() {
            streamer.play(track);
        });
        $pause_button.on('click', function() {
            streamer.pause();
        });
    }
});
