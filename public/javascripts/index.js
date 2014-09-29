
$(document).ready(function () {
  $.ajaxSetup({ cache: false });

  $('#nav_login').click( function(){
    UserLogin()
  })

  $('#nav_print').click( function(){
    $.getJSON( "/ajax/", {'cmd' : 'vlans' }, function( data ) {
      if (data.err) {
        //alert(data.err)
        
        $.Notify({
            style: {background: 'red', color: 'white'},
            shadow: true,
    	      caption: "ERROR",
            content: "<br><br>Bitte einloggen!",
            timeout: 10000 // 10 seconds
        });
        
        return
      }
      var items = [];
      $.each( data.rows, function( key, val ) {
        items.push( "<li id='" + key + "'>" + val.vlan_name + "</li>" );
      })
      $( "<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
      }).appendTo( "body" );
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
 

  })


});