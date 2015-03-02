
var init = function () {

	console.log("init() called");
	
	var nickname = '';
	   socket = io('http://192.168.0.30:5555');

	$('#welcome input:first').focus();

	$('#welcome form').on( 'submit', function(e) {
		$(this).parent().addClass('animated fadeOut');
		$(this).parent().hide();
		
		nickname = $(this).find('input:first').val();
		
		socket.emit( 'ident', { nickname: nickname});
		
		socket.on( 'chat', function( data) {
			$('#chat ul').append('<li><span>'+data.nickname+': </span>'+data.message);
			navigator.vibrate(500);
		});
		
		$('#chat').show();
		
		$('#chat input:first').focus();
		
		$('#chat form').on( 'submit', function(e) {
			var messageInput = $(this).find('input:first');
			
			socket.emit( 'chat', { message: messageInput.val() })
			
			messageInput.val('');
			
			e.preventDefault()
		});
		
		e.preventDefault();
	});
	
	// add eventListener for tizenhwkey
	document.addEventListener('tizenhwkey', function(e) {
		if(e.keyName == "back") {
			try {
				tizen.application.getCurrentApplication().exit();
			} catch (error) {
				console.error("getCurrentApplication(): " + error.message);
			}
		}
	});
	
	
};

// window.onload can work without <body onload="">
window.onload = init;

