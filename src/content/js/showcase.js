function get_current_page() {
    return Math.round($('#apps').scrollLeft() / $('#apps').width());
}

function scroll_to_page(page, animate) {
    var page_width =  $('#apps').width();
    var prev_page = get_current_page()
    var attr = {'scrollLeft': page_width * page};
    // Do the scrolling
    if (animate) {
        $('#apps').animate(attr, 300, function(){
            // animation complete
            update_paging_controls();
        });
    } else {
        $('#apps').attr(attr);
        update_paging_controls();
    }
    $('.pager').each(function(index){
        $(this).toggleClass('selected', index == page);
    });
}

function update_paging_controls() {
    var current_page = get_current_page();
    var last_page = $('.app').length - 1;
    var OPACITY_FADED = 0.3;
    var OPACITY_STD = 1.0;
    
    var target_opacity_prev = current_page == 0 ? OPACITY_FADED : OPACITY_STD;
    var target_opacity_next = current_page == last_page ? OPACITY_FADED : OPACITY_STD;

    if (Math.abs($('.page-control#prev img').css('opacity') - target_opacity_prev) > 0.5) {
        $('.page-control#prev img').animate({'opacity': target_opacity_prev}, 150);
    }
    if (Math.abs($('.page-control#next img').css('opacity') - target_opacity_next) > 0.5) {
        $('.page-control#next img').animate({'opacity': target_opacity_next}, 150);
    }
    
    if (current_page > 0) {
        prev_app_id = $('.app').get(current_page - 1).id;
        $('.page-control#prev a').attr('href', '#!' + prev_app_id);
    } else {
        $('.page-control#prev a').attr('href', 'javascript:void(0);');
    }

    if (current_page < last_page) {
        next_app_id = $('.app').get(current_page + 1).id;
        $('.page-control#next a').attr('href', '#!' + next_app_id);
    } else {
        $('.page-control#next a').attr('href', 'javascript:void(0);');
    }
}

function prev_page() {
    var current_page = get_current_page();

    if (current_page == 0)
        return
    scroll_to_page(current_page - 1, true);
}

function next_page() {
    var current_page = get_current_page();
    var last_page = $('.app').length - 1;
    
    if (current_page == last_page)
        return
    scroll_to_page(current_page + 1, true);
}

$(document).ready(function () {
    var w = $('#apps').width();
    
    // don't run on the iPhone or iPod Touch
    if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
        return;
    }
    
    // First, layout the apps
    var PADDING = 30;
    $('.app').each(function(index) {
        $(this).css({
            'position': 'absolute',
            'top':      0,
            'left':     (w * index)  + 'px',
            'width':    (w - PADDING * 2)  + 'px',
            'padding':  PADDING + 'px',
        });
    });
    $('#apps').css('overflow','hidden');
    
    // Now make the page-control buttons visible
    $('.page-control#next').click(function(){ next_page(); });
    $('.page-control#prev').click(function(el){ prev_page(); });
    $('.page-control').show();

    // Handle #! URLs
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
