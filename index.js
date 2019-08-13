var activityNum = 0;
$(document).ready(function() {

    initSliders();
    var FJS = FilterJS(movies, '#movies', {
        template: '#movie-template',
        search: {
            ele: '#searchbox'
        },
        //search: {ele: '#searchbox', fields: ['distance']}, // With specific fields
        callbacks: {
            afterFilter: function(result) {
                $('#total_movies').text(result.length);
                activityNum = result.length;
            }
        }
    });

    $(".thumbnail").click(function() {
        $(this).addClass("showmore");
    });

    $(".thumbnail").mouseleave(function() {
        $(this).removeClass("showmore");
    });

    $(".cmn-toggle-switch").click(function() {
        $(this).toggleClass("active");
        $(".sidebar").toggleClass("active");
    });



    FJS.addCallback('beforeAddRecords', function() {
        if (this.recordsCount >= 450) {
            this.stopStreaming();
        }
    });

    FJS.addCallback('afterAddRecords', function() {
        var percent = (this.recordsCount - 250) * 100 / 250;

        $('#stream_progress').text(percent + '%').attr('style', 'width: ' + percent + '%;');

        if (percent == 100) {
            $('#stream_progress').parent().fadeOut(1000);
        }
    });



    FJS.addCriteria({
        field: 'region',
        ele: '#region_filter',
        type: 'value',
        all: 'all'
    });
    FJS.addCriteria({
        field: 'costper',
        ele: '#cost_filter',
        type: 'range'
    });
    FJS.addCriteria({
        field: 'distance',
        ele: '#distance_filter',
        type: 'range'
    });
    FJS.addCriteria({
        field: 'tags',
        ele: '#tags_criteria input:checkbox'
    });

    /*
   * Add multiple criterial.
    FJS.addCriteria([
      {field: 'tags', ele: '#tags_criteria input:checkbox'},
      {field: 'region', ele: '#region_filter', type: 'range'}
    ])
  */


    window.FJS = FJS;
});

function initSliders() {
    $("#cost_slider").slider({
        min: 0,
        max: 100,
        values: [0, 100],
        step: 1,
        range: true,
        slide: function(event, ui) {
            $("#cost_range_label").html(ui.values[0] + ' - ' + ui.values[1]);
            $('#cost_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
        }
    });

    $("#random").click(function() {
        var pick = "";
        $(".fjs_item").hide();
        pick = new Array(Math.floor((Math.random() * activityNum) + 1), Math.floor((Math.random() * activityNum) + 1), Math.floor((Math.random() * activityNum) + 1));
        $.each(pick, function(index, value) {
            $("#fjs_" + value).show();
        })
    });


    $("#clear_random").click(function() {
        $(".fjs_item").show();
    });

    $("#distance_slider").slider({
        min: 10,
        max: 250,
        values: [0, 250],
        step: 10,
        range: true,
        slide: function(event, ui) {
            $("#distance_range_label").html(ui.values[0] + ' mins. - ' + ui.values[1] + ' mins.');
            $('#distance_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
        }
    });

    $('#tags_criteria :checkbox').prop('checked', true);
    $('#all_tags').on('click', function() {
        $('#tags_criteria :checkbox').prop('checked', $(this).is(':checked'));
    });

}
