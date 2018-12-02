/*
 *
 * CryptoKitties LevelDB Workload
 *
 * Evan Kaminsky
 * Nov 19, 2018
 *
 * CryptoKitties and the stats scripts must be properly mined and loaded into
 * Geth for these functions to succeed
 *
 * Notes
 * - Use -1 to represent the Null (0x0) account 
 * - Inspections: KC.kitties.call(0), KC.getKittyString.call(0), KC.getKitties.call()
 */

function kittyStats() {
	console.log("\nAccount Summary");
	console.log("   0x0 :", KittyCore.balanceOf.call(0), "kitties");
	for (var i = 0; i < eth.accounts.length; i++) {
		var kitty_balance = KittyCore.balanceOf.call(eth.accounts[i]);
    	console.log("    ", i, ":", kitty_balance, "kitties");
	}

	console.log("\nKitty Summary");
	for (var i = 0; i < KittyCore.numKitties.call(); i++) {
		var owner = KittyCore.kittyIndexToOwner.call(i);
		console.log("   Kitty", i, ": Account", owner);
	}

	console.log("\nGas Summary");
	for (var i = 0; i < eth.accounts.length; i++) {
		var gas_balance = eth.getBalance(eth.accounts[i]);
		console.log("   ", i, ":", gas_balance);
	}
	console.log();
}



// Transfer

function _sendTransfer(from_account_index, to_account_index, kitty_id, gas) {
	from_account = (from_account_index < 0) ? 0 : eth.accounts[from_account_index];
	to_account   = (  to_account_index < 0) ? 0 : eth.accounts[  to_account_index];
	unlock();

	transaction_abi = KittyCore.transferFrom.getData(from_account, to_account, kitty_id);
	eth.sendTransaction({from: GAS_ACCOUNT, to: KittyCore.address, data: transaction_abi, gas: gas});
}

function transfer(from_account_index, to_account_index, kitty_id, gas) {
	_sendTransfer(from_account_index, to_account_index, kitty_id, gas);
	mineWhilePending();
}


// Create

function _sendCreate(mom_id, dad_id, gen, genes, owner_account_index, gas) {
	owner_account = (owner_account_index < 0) ? 0 : eth.accounts[owner_account_index];
	unlock();
	
	create_abi = KittyCore.createKitty.getData(mom_id, dad_id, gen, genes, owner_account);
	eth.sendTransaction({from: GAS_ACCOUNT, to: KittyCore.address, data: create_abi, gas: gas});
}

function _sendDefaultCreate(owner_account_index, gas) {
	_sendCreate(0, 0, 0, 0, owner_account_index, gas);
}

function create(owner_account_index, gas) {
	_sendDefaultCreate(owner_account_index, gas);
	mineWhilePending();	
}


// Sequential Transactions

function seqCreates(quantity, gas) {
	var previous_stats    = getStats();
	var submission_stats = [0, 0, 0, 0];
	var mining_stats     = [0, 0, 0, 0];

	for (var i = 0; i < quantity; i++) {
		_sendDefaultCreate(-1, gas);
		submission_stats = add(submission_stats, subtract(getStats(), previous_stats));
		previous_stats = getStats();

		mineWhilePending();
		mining_stats = add(mining_stats, subtract(getStats(), previous_stats));
		previous_stats = getStats();
	}
	
	console.log("Submission Stats:", submission_stats);
	console.log("Mining Stats:    ", mining_stats, "\n");
}

function seqTransfers(quantity, gas) {
	var previous_stats    = getStats();
	var submission_stats = [0, 0, 0, 0];
	var mining_stats     = [0, 0, 0, 0];

	for (var i = 0; i < quantity; i++) {
		var sender   =  0;
		var receiver = -1;
		if (i % 2 == 0) {
			sender   = -1;
			receiver =  0;
		}

		_sendTransfer(sender, receiver, 0, gas);
		submission_stats = add(submission_stats, subtract(getStats(), previous_stats));
		previous_stats = getStats();

		mineWhilePending();
		mining_stats = add(mining_stats, subtract(getStats(), previous_stats));
		previous_stats = getStats();
	}

	console.log("Submission Stats:", submission_stats);
	console.log("Mining Stats:    ", mining_stats, "\n");
}


// Multi-Account Transactions

function multiTransfers(quantity, gas) {
	var previous_stats = getStats();

	for (var i = -1; i < quantity - 1; i++) {
		_sendTransfer(i, i + 1, 0, gas);
	}

	var submission_stats = subtract(getStats(), previous_stats);
	previous_stats = getStats();

	mineWhilePending();
	var mining_stats = subtract(getStats(), previous_stats);

	console.log("Submission Stats:", submission_stats);
	console.log("Mining Stats:    ", mining_stats, "\n");
}

function multiCreates(quantity, gas) {
	var previous_stats = getStats();

	for (var i = -1; i < quantity - 1; i++) {
		_sendDefaultCreate(i, gas);
	}

	var submission_stats = subtract(getStats(), previous_stats);
	previous_stats = getStats();

	mineWhilePending();
	var mining_stats = subtract(getStats(), previous_stats);

	console.log("Submission Stats:", submission_stats);
	console.log("Mining Stats:    ", mining_stats, "\n");
}


// Batch Transactions (Deprecated)

function batchTransfers(quantity, gas) {
	stats();
	for (var i = 0; i < quantity; i++) {
		if (i % 2 == 0) {
			_sendTransfer(-1, 0, 0, gas, eth.accounts[0], false);
		} else {
			_sendTransfer(0, -1, 0, gas, eth.accounts[0], false);
		}
	}
	stats();
	mineWhilePending();
	stats();
}

function batchCreates(quantity, gas) {
	stats();
	for (var i = 0; i < quantity; i++) {
		_defaultCreate(0, gas, eth.accounts[0], false);
	}
	stats();
	mineWhilePending();
	stats();
}

