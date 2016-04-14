$(function () {
  $('#start,#end').autocomplete({
    source: function (request, response) {
      $.ajax({
        url: 'http://pathfinding.restdesc.org/prefixes',
        dataType: "json",
        data: { query: request.term },
        success: response,
      });
    },
    delay: 50,
    autoFocus: true,
    select: function (event, ui) {
      if (ui.item) {
        $(this).val(ui.item.label)
               .data('uri', ui.item && ui.item.uri)
               .trigger('change');
      }
    },
  });

  // Shower.js and jQuery UI compatibility
  $('ul.ui-autocomplete').appendTo($('#path-example'));

  $('#find').click(function () {
    $('#path').empty().append($('<li><em>searching...</em></li>'));
    $.getJSON('http://pathfinding.restdesc.org/paths',
              { from: $('#start').data('uri'),
                to:   $('#end').data('uri'), },
    function (result) {
      var path = result && result.path || [], entries = [], $path = $('#path').empty();
      for (var i = 1; i < path.length; i+= 2) {
        var source = path[i - 1], link = path[i], dest = path[i + 1];
        $path.append($('<li>').append([
          ' ', getLabel(source),
          ' ', $('<em>').text(getLabel(link)), link.inverse ? ' of ' : ' ',
          getLabel(dest),
        ]));
      }
    });
  });

  function getLabel(node) {
    return decodeURIComponent(node.uri).match(/[^\/]*$/)[0].replace(/_/g, ' ');
  }
});
