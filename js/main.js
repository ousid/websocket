$(document).ready(function () {
	'use strict';

	// define variables
	var usernameForm 	= $(".username-setter"),
		usernameInput 	= usernameForm.find('.username-input'),
		chatForm 		= $(".chatForm"),
		messageInput 	= $(".chatForm textarea"),
		isConnected 	= false,
		messagesList	= $(".messages-list"),
		chatName 		= $.cookie('chat_name'),
		conn 			= new WebSocket('ws://localhost:8080');

	/**
	 * set the chat offline when the server is desconnected 
	 * or there's something wrong | or the user desconnected itself
	 */

	function setOnline() {
		$('.offline').hide();
		$('.deconnect').show();
		$('.connect').hide();

		chatForm.fadeIn();
		isConnected = true;
	}

	/**
	 * this function to set the user in offline mode 
	 * by hide to the user the chat form and set the variable isConnected to false
	 */

	function setOffline() {
		$('.offline').show();
		$('.connect').show();
		$('.deconnect').hide();
		chatForm.hide();
		isConnected = false;
	}

	// check if isConnected or not 
	if (isConnected) {
		setOffline();
		return;
	}

	// bring the mode offline by default
	setOffline();

	/**
	 * if the user submit the username input
	 */

	usernameForm.on('submit', function (e) {
		e.preventDefault();
		var chatName = usernameInput.val();
		if (chatName.length > 0) { // check if the username is not empty
			$.cookie('chat_name', chatName); // register new cookie name
			$('.username').text(chatName); // put the new name in the span with class username
			usernameInput.val(''); // prevent the input empty
 			$('.message-content').focus(); // switch the cursor in the message form directlly
		}else { 
			// detect an error
			usernameInput.addClass('warning-field');
			$('.valid-user').css('display', 'block');
		}
	}); 

	/**
	 * if the user focus in the username input
	 */

	usernameInput.on('focus', function () {

		// remove the warning class
		usernameInput.removeClass('warning-field');

		// hide the valide user note
		$('.valid-user').css('display', 'none');	
	});

	// if there's no chatname
	if ( !chatName ) {

		// set the default name anonyme + the current timestamp
		var timestamp 	= (new Date()).getTime();
		chatName 		= 'anonyme_' + Math.round(timestamp/20000); 
		
		// register the default cookie name
		$.cookie('chat_name', chatName); 
	}

	// if there's a name put it in span with the class username
	$('.username').text(chatName);


	// if the user submitted the message
	chatForm.on("submit", function (e) {
		
		// stop the behaviour of the submit button
		e.preventDefault();


		// check if the value of the content message is not empty
		if ( messageInput.val !== '' ) {
<<<<<<< HEAD
=======
			console.log(messageInput);
>>>>>>> 4f5c98e1c5933be0184880c69ab7d8e6ea7bbc25

			// create new object
			var message = {
				text: messageInput.val(),
				sender: $.cookie('chat_name'),
				type: 'message'
			};

			$('.connected').slideUp(100);

			// send a new message if the value is not empty
			conn.send(JSON.stringify(message));
			messagesList.prepend('<li class="text-success"><span class="text-success"> <span class="sender"><b>Vous dit: </b></span> ' + message.text + '</li>');

			// make the value of the textarea empty after sending the message
			messageInput.val('');

		}else { 
			// if is not empty bring warning
			console.log('none');
			content.addClass('warning-field');
		}
	});
	
	// if the status connect  is clicked
	$('.connect').on('click', function () {
		setOnline();
		location.reload();
	});

	// if status deconnect is clicked
	$('.deconnect').on('click', function () {
		setOffline();
		$('.connected').fadeOut();
		conn.close()
	});

	// if there's  a new connection
	conn.onopen = function (e) {
		$('.message-append').html('<div class="connected"><span class="text-success text-center"> Vous êtes maintenant en ligne</span></div>');
		// add note to the console 
		console.log("Connection established!");

		setOnline();

	}

		// if there's a new message
		conn.onmessage = function (e) {
			// put the new message in the console
			console.log(e.data);

			// add it in the chat room message list
			messagesList.prepend('<li>' + e.data + '</li>');
		}

		// if chatroom was closed

		conn.onclose = function(e) {
			console.log("Disconnected");
<<<<<<< HEAD
			console.log(e);
=======
>>>>>>> 4f5c98e1c5933be0184880c69ab7d8e6ea7bbc25
			setOffline();
			$('.connected').fadeOut(100);
			$('.message-append').html('<div class="desconnect">Le chat était déconnecté </div>');
		}

});

