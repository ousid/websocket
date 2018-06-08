<?php 
<<<<<<< HEAD
=======

>>>>>>> 4f5c98e1c5933be0184880c69ab7d8e6ea7bbc25
session_start();

require 'vendor/autoload.php';
require 'src/Chat.php';

use Ratchet\Server\IoServer;
use ChatApp\Chat;
use ChatApp\models\DB;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;


$server = IoServer::factory(
	new HttpServer(
		new WsServer(
			new Chat()
		)
	),
	8080
);

<<<<<<< HEAD
$server->run();
=======
$server->run(); 
>>>>>>> 4f5c98e1c5933be0184880c69ab7d8e6ea7bbc25
