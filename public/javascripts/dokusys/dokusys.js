
$(document).ready(function () {

  $(window).resize(function () {
    $('#doc_inhalt').height($(window).height() - $('#doc_inhalt').position().top - 30)
  })

  $('#doc_search').change(function () {
    doc_search( $('#doc_search').val() )
  })
  $('button',$('#doc_search').parent() ).click(function () {
    doc_search( "" )
  })
  $('#doc_search').keyup(function () {
    doc_search($(this).val()) 
  })

  $('#doc_btnOpenAll').click(function () {
    $('#doc_inhalt .collapsed').removeClass("collapsed").children("ul").fadeIn("fast")
  })
  $('#doc_btnCloseAll').click(function () {
    $('#doc_inhalt li').has('ul').addClass("collapsed").children("ul").fadeOut("fast")
  })

  function doc_openTopic(sel) {
    var par = $(sel).data("json").parent
    if (par == 0) { return }
    $("#topic" + par).removeClass("collapsed").children("ul").fadeIn("fast")
    $("#topic" + par).fadeIn("fast")
    $(sel).fadeIn("fast")
    doc_openTopic("#topic" + par)
  }

  function doc_search(txt) {
    if (txt.length > 2) {
      $('#doc_inhalt li').hide()
      $.each($("#doc_inhalt li"), function (e, ui) {
        if ( $(ui).data("json").topic.toUpperCase().indexOf(txt.toUpperCase()) > -1 ) {
          doc_openTopic("#"+$(ui).attr("id"))
        }
      })
    } else {
      $('#doc_inhalt li').show()
    }
  }

  $.getJSON("/DokuSys/getList", function (data) {
    if (data.err) {
      alert(data.err)
      $(location).attr("href", "/login")
      return
    }
    var tree = $("<ul class=treeview data-role=treeview></ul>")
    $.each(data.rows, function (key, obj) {
      //if (obj.parent != 0 && obj.parent != 105) { return }
      ntopic = $("<li class='node collapsed' id=topic" + obj.id + " data-json='" + JSON.stringify(obj) + "'><a href='#'>" + obj.topic + "</a></li>")
      if (obj.parent > 0) {
        if ($('#topic' + obj.parent, tree).children("ul").length == 0) {
          $("<UL>").appendTo($('#topic' + obj.parent, tree))
          $("<span class=node-toggle></span>").prependTo($('#topic' + obj.parent + " a", tree))
        }
        $(ntopic).appendTo($('#topic' + obj.parent + " UL", tree))
      } else {
        $(ntopic).appendTo($(tree))
      }
    })
    $("#doc_inhalt ul").replaceWith(tree)
    $("#doc_inhalt a").on('click', function (e) {
      $('#doc_topic').text($(this).text())
      $('#doc_id').text($(this).parent().data("json").id)
    })
    $("#doc_inhalt a").on('dblclick', function (e) {
      $('#doc_topic').text($(this).text())
      var $this = $(this), node = $this.parent("li");
      node.toggleClass('collapsed')
      if (node.hasClass('collapsed')) {
        node.children('ul').fadeOut('fast');
        //that.options.onNodeCollapsed(node);
      } else {
        node.children('ul').fadeIn('fast');
        //that.options.onNodeExpanded(node);
      }
    })
    $.Metro.initAll()
  })

  $(window).resize()
})