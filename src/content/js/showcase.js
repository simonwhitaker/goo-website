$(document).ready(function(){
  ul = $('<ul id="app-tabs"></ul>');
  ul.addClass('tabs');
  
  // populate tabs
  $('#apps .app').each(function(index){
    name = $(this).attr('id'); // e.g. "foo-bar"
    title = $(this).find('h2').find('a').html(); // e.g. "Foo Bar"
    a = $('<a>' + title + '</a>');
    a.attr('href', 'javascript:void(0);');
    a.attr('rel', name);
    
    a.click(function(event) {
      // display appropriate .app block
      $('.app[display!=none]').each(function(){$(this).hide()});
      $('#' + $(this).attr('rel')).fadeIn();

      // selet the appropriate tab
      $('#app-tabs').find('.selected').each(function(){$(this).removeClass('selected')});
      $('#app-tabs .tab a').eq(index).addClass('selected');
      event.preventDefault();
    });
    
    li = $('<li></li>');
    li.addClass('tab');
    if (index == 0)
      a.addClass('selected');

    // title.appendTo(a);
    a.appendTo(li);
    li.appendTo(ul);
  });
  
  ul.prependTo('#apps');
  ul.find('li').first().find('a').addClass('first');
  ul.find('li').last().find('a').addClass('last');
});
