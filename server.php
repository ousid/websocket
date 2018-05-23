<?php 

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

$server->run(); 