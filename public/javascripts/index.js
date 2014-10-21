
function checkSize() {
  if ($(this).width() >= 800) {
    //$('#workspace').addClass('padd')  
  } else {
    //$('#workspace').removeClass('padd')  
  }
}

$(document).ready(function () {
  $.ajaxSetup({ cache: false });
  $(window).resize( function() {
    checkSize()
  })
  $('#navbar').bind("contextmenu",function(e){
        return false;
    });

  $('#nav_login').click( function(){
    UserLogin()
  })


  $('#nav_SysTools').dblclick( function(){
    $.get( "/system", function( data ) {
      $('#workspace').html(data)
    })
    if ($('#menutoggle').is(":visible") ) $('#menucollapse').toggle()
  })

  $('#nav_UserVerwaltung').click( function(){
    $.get( "/system/user", function( data ) {
      $('#workspace').html(data)
    })
    if ($('#menutoggle').is(":visible") ) $('#menucollapse').toggle()
  })

  $('#nav_NetIO').click( function(){
    $.get( "/netio/", {'cmd' : 'vlans' }, function( data ) {
      $('#workspace').html(data)
    })
    if ($('#menutoggle').is(":visible") ) $('#menucollapse').toggle()
  })

  $('#nav_NetIO_Tiles').click( function(){
    $.get( "/netio/tiles", {'cmd' : 'vlans' }, function( data ) {
      $('#workspace').html(data)
    })
    if ($('#menutoggle').is(":visible") ) $('#menucollapse').toggle()
  })

  $('#nav_print').click( function(){
    $.getJSON( "/ajax/", {'cmd' : 'vlans' }, function( data ) {
      if (data.err) {
        $.Notify({
            style: {background: 'red', color: 'white'},
            shadow: true,
    	      caption: "Error",
            content: "Bitte einloggen!",
            timeout: 10000 // 10 seconds
        });
        return
      }
      var items = [];
      $.each( data.rows, function( key, val ) {
        items.push( "<tr><td id='" + key + "'>" + key + "</td><td>" + val.vlan_name + "</td></tr>" );
      })

      $( "<table />", {
        "class": "table table-fixed-header table-hover striped bordered hovered",
        html: "<thead><tr><th>VLans</th><th>Name</th></tr></thead><tbody>" + items.join( "" ) + "</tbody>"
      }).appendTo( "#vlans" );
      $('#vlans table tr:last td').each( function(n,ui){
        console.log( n + $(ui).html() )
        console.log( $('#vlans table th:nth-child('+(n+1)+')').html() )
        //$('#vlans table th:nth-child('+(n+1)+')').width( $(ui).width() )
        $(ui).width( $('#vlans table th:nth-child('+(n+1)+')').width() )
      } )
    })
    .done(function() {
      console.log( "second success" );
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });
  if ($('#menutoggle').is(":visible") ) $('#menucollapse').toggle()

  })

  checkSize()
});