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


GAS_ACCOUNT = eth.accounts[0];

function unlock() {
	personal.unlockAccount(GAS_ACCOUNT, "1234");
}

function allStats() {
	stats();
	kittyStats();
}

function mineThenStats() {
	mineWhilePending();
	allStats();
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
  		if ((new Date().getTime() - start) > milliseconds){
    		break;
  		}
  	}
}





// Transfer

function _sendTransfer(from_account_index, to_account_index, kitty_id, gas, print) {
	from_account = (from_account_index < 0) ? 0 : eth.accounts[from_account_index];
	to_account   = (  to_account_index < 0) ? 0 : eth.accounts[  to_account_index];
	unlock();

	// Generate 'trsansferFrom' bytecode
	transaction_abi = KittyCore.transferFrom.getData(from_account, to_account, kitty_id);
	if (print) {
		stats();
	}

	// Send transfer transaction to the blockchain
	eth.sendTransaction({from: GAS_ACCOUNT, to: KittyCore.address, data: transaction_abi, gas: gas});
	if (print) {
		stats();
	}
}

function transfer(from_account_index, to_account_index, kitty_id, gas) {
	_sendTransfer(from_account_index, to_account_index, kitty_id, gas, true);
	mineThenStats();
}



// Create

function _sendCreate(mom_id, dad_id, gen, genes, owner_account_index, gas, print) {
	owner_account = (owner_account_index < 0) ? 0 : eth.accounts[owner_account_index];
	unlock();
	
	// Generate 'createKitty' bytecode 
	create_abi = KittyCore.createKitty.getData(mom_id, dad_id, gen, genes, owner_account);
	if (print) {
		stats();
	}

	// Send transfer transaction to the blockchain
	eth.sendTransaction({from: GAS_ACCOUNT, to: KittyCore.address, data: create_abi, gas: gas});
	if (print) {
		stats();
	}
}

function create(owner_account_index, gas) {
	_sendCreate(0, 0, 0, 0, owner_account_index, gas, true);
	mineThenStats();
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
	mineThenStats();
}

function multipleCreates(quantity, gas) {
	allStats();

	for (var i = 0; i < quantity; i++) {
		_sendCreate(0, 0, 0, 0, 0, gas, eth.accounts[0], false);
	}

	stats();
	mineThenStats();
}



// Gas Calculations

// Copy & Paste this function - Eval requires global scope with Geth
function scopifyContracts() {
	var contracts = contractOutput.contracts;
	unlock();

	for (var key in contracts) {
		var contract_name = key.split(":")[1];
		var abi = JSON.parse(contracts[key].abi);
		var bin = "0x" + contracts[key].bin;
		
		var contract = web3.eth.contract(abi);
		eval("var " + contract_name + "Bin = bin;");
		eval("var " + contract_name + "Contract = contract;");
	}
}

function submitContract(name, gas) {
	unlock();

	eval("var bin = " + name + "Bin;");
	eval("var contract = " + name + "Contract;");

	var storage_instance = contract.new({from: GAS_ACCOUNT, data: bin, gas: gas}, function(err, contract) {
   		if (err) {
   			console.log("✕ " + name + "\n   " + err);
   		} else if (!contract.address) {
   	 		console.log("~ " + name + " Pending\n");
  		} else {
     		console.log("✓ " + name + "Contract successfully mined!\n   Contract Address: " + contract.address);
    	}
    });

	eval("var " + name + "Storage = storage_instance;");
}

function submitMineContract(name) {
	miner.start(1);
	sleep(1000 * 60 * 1);
	miner.stop();

	stats();
	submitContract(name, 1100000);
	stats();
	mineWhilePending();
	stats();
}



/*

> Inspecting Kitties
KittyCore.kitties.call(0)
KittyCore.getKittyString.call(0)
KittyCore.getKitties.call()

> Creating Kitties
KittyCore.createKitty.call(0, 0, 0, 1234, eth.accounts[0])

*/









