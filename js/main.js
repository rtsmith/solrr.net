    // $('.audio-player').each( function(i) {
    //     var url = $(this).data('track');
    //     new Audioplayer(url);
    // });
$(function() {
    var url = $('.audio-player').data('track');
    var track = new Audioplayer(url);
    var $play_button = $('.audio-player .btn.play');
    var $pause_button = $('.audio-player .btn.pause');

    $play_button.on('click', function() {
        streamer.play(track);
    });
    $pause_button.on('click', function() {
        streamer.pause();
    });
});
