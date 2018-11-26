pragma solidity ^0.4.13;

contract Simple {
 
	uint public total = 0;

	Room[] public rooms;
	
	event OnCreateRoom(address indexed _from, uint256 _value);

	struct Room {
	    address[] players;       
	    uint256 whosTurnId;
	    uint256 roomState;
	 }  



 	function arithmetics(uint _a, uint _b) public returns (uint o_sum, uint o_product) {
   		o_sum = _a + _b;
    	o_product = _a * _b;
  	}

  	function multiply(uint _a, uint _b) public returns (uint) {
    	return _a * _b;
  	}

  	function incrementOne() public {
  		total += 1;
  	}

  	function increment(uint value) public {
  		total += value;
  	}

  	function incrementReturn() public returns (uint) {
  		total += 1;
  		return total;
  	}

  	function setLocal(uint index, uint value) public returns (uint[]) {
  		uint[] storage local_vals;
  		local_vals[index] = value;
  		return local_vals;
  	}



	function createRoom() public {
	    Room memory room = Room(new address[](0), 0, 0);
	    rooms.push(room);
	    rooms[rooms.length -1 ].players.push(msg.sender);

	    emit OnCreateRoom(msg.sender, 0);
	 }

	function getRoomPlayers(uint i) public view returns (address[]){
	 	return rooms[i].players;
	}

}