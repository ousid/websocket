<?php
namespace ChatApp;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

/**
* this new class chat is impolemented from MessageComponentInterface and it use his functions
* in the constructor will register a new SplObjectStorage in protected variable $clinets to register the message and chat content
*
* onOnpen Method for open new connection for a client and let him send a receive messges from the other client
* onMessage for detecte the new messages by the server and show it to other users
* onClose for detatch the connection and detect who deconnect
* onError for detect if somthing Wrong was happend in the server
*/

class Chat implements MessageComponentInterface 
{

	protected $clients;

	/**
	 * the function construct is trigger automatic when the class is called
	 * it register a new storage object in the client param
	 * @param void
	 * @return mix
	 */

	public function __construct() 
	{
		$this->clients = new \SplObjectStorage();
	}

	/**
	 * this function is for open new connection with specifique id
	 * use the interface ConnecitonInterface as $conn variable 
	 * when onOnpen method is triggered is attach the connection and start the storage object
	 * @param interafce $conn
	 * @return mix
	 */

	public function onOpen( ConnectionInterface $conn )
	{
		$this->clients->attach( $conn );
		echo "New Connection! ({$conn->resourceId})\n";

	}

	/**
	 * when the server is detect a new message the onMessgae method is triggred
	 * the message comming from main.js as JSON string and decoded
	 * if in case is the receive message is a message type the message will showen in the forntend in all users
	 * with send method [ if the client is not the sender ]
	 */

	public function onMessage( ConnectionInterface $from, $msg )
	{
		$msg = json_decode($msg);
		echo "Received a New Message: {$msg->text}\n";

		switch( $msg->type ) {
			case 'message':
				foreach ( $this->clients as $clinet ) {
					if ( $clinet !== $from ) {
					 $clinet->send( '<p><span class="text-info sender"><b> ' . $msg->sender . ' dit: </b></span><span style="color:#333"><b>' . $msg->text . '</b></span></p>');
					}
				}
				break;
		}
	}

	/**
	 * the method onCllose is trigger when the user is leave the chat
	 * simplly is detach the connection and detected who Disconnect from the chat
	 * 
	 * @param interface $conn
	 * @return mix
	 */

	public function onClose( ConnectionInterface $conn )
	{
		$this->clients->detach( $conn );
		echo "Connection {$conn->resourceId} Has been Disconnected \n";
	}

	/**
	 * the method onError is detect is any error occured on the server 
	 * and show the error whithin the Class and close the connection
	 *
	 * @param interface $conn
	 * @param object $e
	 * @return mix
	 */

	public function onError( ConnectionInterface $conn, \Exception $e )
	{
		echo "an Error occured: {$e->getMessage()}";
		$conn->close();
	}
}
