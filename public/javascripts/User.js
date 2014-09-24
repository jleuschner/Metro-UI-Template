
function UserLogin() {
  $.Dialog({
    overlay: true,
    shadow: true,
    flat: true,
    draggable: true,
    //icon: '<img src="images/excel2013icon.png">',
    icon: '<span class="icon-locked" />',
    title: 'Flat window',
    content: '',
    padding: 10,
    onShow: function(_dialog){
      var content = '<form class="user-input" id="UserLogin" action="/login" method="post">' +
        '<label>Login</label>' +
        '<div class="input-control text"><input type="text" name="login" tabindex="1" ><button class="btn-clear"></button></div>' +
        '<label>Password</label>'+
        '<div class="input-control password"><input type="password" name="password" tabindex="2" ><button class="btn-reveal"></button></div>' +
        //'<div class="input-control checkbox"><label><input type="checkbox" name="c1" checked/><span class="check"></span>Check me out</label></div>'+
        '<div class="form-actions">' +
        '<button class="button primary" tabindex="2" >Login</button>&nbsp;'+
        '<button class="button" type="button" onclick="$.Dialog.close()" tabindex="2" >Cancel</button> '+
        '</div>'+
        '</form>';
        $.Dialog.title("User login");
        $.Dialog.content(content);
        $('#UserLogin input:first').focus()
      }
  });
}