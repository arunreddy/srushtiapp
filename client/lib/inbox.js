
$(document).ready(function () {

    $('.task-check').click(function () {
        $(this).toggleClass("icon-check-empty");
        $(this).toggleClass("icon-check");
    });

    $('.action-item').click(function(){
        obj = $(this);
        obj.parent("div").children().each(function(){
            $(this).removeClass('action-item-active');
            data = $(this).attr('data');
            $('#task-'+data).hide();
        });

        obj.addClass('action-item-active');
        data = obj.attr('data');
        $('#task-'+data).show(1000);
    });
});