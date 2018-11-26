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
 *
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

function allStats() {
	stats();
	kittyStats();
}



// Transfer

function _sendTransfer(from_account_index, to_account_index, kitty_id, gas, gas_account, print) {
	from_account = (from_account_index < 0) ? 0 : eth.accounts[from_account_index];
	to_account   = (  to_account_index < 0) ? 0 : eth.accounts[  to_account_index];
	personal.unlockAccount(gas_account, "1234");

	// Generate 'trsansferFrom' bytecode
	transaction_abi = KittyCore.transferFrom.getData(from_account, to_account, kitty_id);
	if (print) {
		stats();
	}

	// Send transfer transaction to the blockchain
	eth.sendTransaction({from: gas_account, to: KittyCore.address, data: transaction_abi, gas: gas});
	if (print) {
		stats();
	}
}


function transferWithPayer(from_account_index, to_account_index, kitty_id, gas, gas_account) {
	_sendTransfer(from_account_index, to_account_index, kitty_id, gas, gas_account, true);
	mineWhilePending();
	allStats();
}

function transfer(from_account_index, to_account_index, kitty_id, gas) {
	transferWithPayer(from_account_index, to_account_index, kitty_id, gas, eth.accounts[0]);
}



// Create

function _sendCreate(mom_id, dad_id, gen, genes, owner_account_index, gas, gas_account, print) {
	owner_account = (owner_account_index < 0) ? 0 : eth.accounts[owner_account_index];
	personal.unlockAccount(gas_account, "1234");
	
	// Generate 'createKitty' bytecode 
	create_abi = KittyCore.createKitty.getData(mom_id, dad_id, gen, genes, owner_account);
	if (print) {
		stats();
	}

	// Send transfer transaction to the blockchain
	eth.sendTransaction({from: gas_account, to: KittyCore.address, data: create_abi, gas: gas});
	if (print) {
		stats();
	}
}

function createWithPayer(mom_id, dad_id, gen, genes, owner_account_index, gas, gas_account) {
	_sendCreate(mom_id, dad_id, gen, genes, owner_account_index, gas, gas_account, true);
	mineWhilePending();
	allStats();
}

function create(owner_account_index, gas) {
	createWithPayer(0, 0, 0, 0, owner_account_index, gas, eth.accounts[0]);
}


// Batch Transactions

function multipleTransfers(quantity, gas) {
	allStats();

	for (var i = 0; i < quantity; i++) {
		if (i % 2 == 0) {
			_sendTransfer(-1, 0, 0, gas, eth.accounts[0], false);
		} else {
			_sendTransfer(0, -1, 0, gas, eth.accounts[0], false);
		}
	}

	stats();
	mineWhilePending();
	allStats();
}


/*

> Inspecting Kitties
KittyCore.kitties.call(0)
KittyCore.getKittyString.call(0)
KittyCore.getKitties.call()

> Creating Kitties
KittyCore.createKitty.call(0, 0, 0, 1234, eth.accounts[0])

*/









