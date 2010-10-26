function get_current_page() {
    return Math.round($('#apps').scrollLeft() / $('#apps').width());
}

function scroll_to_page(page, animate) {
    var page_width =  $('#apps').width();
    var prev_page = get_current_page()
    var attr = {'scrollLeft': page_width * page};
    // Do the scrolling
    if (animate) {
        $('#apps').animate(attr, 300);
    } else {
        $('#apps').attr(attr);
    }
    $('.pager').each(function(index){
        $(this).toggleClass('selected', index == page);
    });
}

$(function () {
    var w = $('#apps').width();
    
    // don't run on the iPhone
    if (w > 480) {
        var page_control = $('<div></div>').attr('id','page_control');
        var PADDING = 30;
        $('.app').each(function(index) {
            $(this).css({
                'position': 'absolute',
                'top':      0,
                'left':     (w * index)  + 'px',
                'width':    (w - PADDING * 2)  + 'px',
                'padding':  PADDING + 'px',
            });
            var pager = $('<a></a>').attr('class','pager');
            pager.attr('href','#!' + $(this).attr('id')).html($('h2 a', $(this)).html());
            pager.click(function(){ scroll_to_page(index, true); });
            page_control.append(pager);
        });
        $('#apps').css('overflow','hidden');
        $('#showcase').prepend(page_control);
    }
    if (r = location.href.match('#!(.+)')) {
        var app = $('#' + r[1]);
        var index = $('.app').index(app);
        if (index >= 0)
            scroll_to_page(index, false);
        else
            scroll_to_page(0);
    } else {
        scroll_to_page(0);
    }
});
