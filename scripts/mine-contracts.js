/*
* Script to add contracts from a Solc abi+bin JSON file to Geth
* 
* Based on https://medium.com/@gus_tavo_guim/deploying-a-smart-contract-the-hard-way-8aae778d4f2a
*
* Evan Kaminsky
* November 6, 2018
*/

var contracts = contractOutput.contracts;

personal.unlockAccount(eth.accounts[0], "1234")


function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
  		if ((new Date().getTime() - start) > milliseconds){
    		break;
  		}
  	}
}

console.log("\n\nMining to acquire gas to submit contracts...\n");
miner.start(1);
sleep(1000 * 60 * 2);
miner.stop();


console.log("\n\nSubmitting contract storages to blockchain...\n");

for (var key in contracts) {
	// Extract properties from the contract
	var contract_name = key.split(":")[1];
	var abi = JSON.parse(contracts[key].abi);
	var bin = "0x" + contracts[key].bin;

	var contract = web3.eth.contract(abi);

	// Submit contract to blockchain
	var storage_instance = contract.new({from: eth.accounts[0], data: bin, gas: 10000000}, (function() {
		var local_contract_name = contract_name;
		return function (err, contract) {
   			if (err) {
   				console.log("✕ " + local_contract_name + "\n   " + err);
   			} else if (!contract.address) {
    	 		console.log("~ " + local_contract_name + " Pending\n");
   			} else {
     			console.log("✓ " + local_contract_name + "Contract successfully mined!\n   Contract Address: " + contract.address);
    		}
    	}
    })());

	// Add contract and storage instance to scope
	eval("var " + contract_name + "Storage = storage_instance;");
	eval("var " + contract_name + "Contract = contract");
}


console.log("\nMining to assign addresses to the contracts...\n");
miner.start(1);
sleep(1000 * 60 * 5);
miner.stop();


console.log("\n\nCreating contract objects...\n");

for (var key in contracts) {
	var contract_name = key.split(":")[1];

	eval("var hash = " + contract_name + "Storage.transactionHash");
	if (hash) {
		console.log("✓ " + contract_name + "\n   Transaction Hash: " + hash);
	} else {
		console.log("✕ " + contract_name + "\n   Transaction Hash: " + hash);
		continue;
	}

	var address = eth.getTransactionReceipt(hash).contractAddress;
	eval("var " + contract_name + " = " + contract_name + "Contract.at(address)");
}

console.log("\n\nAwaiting contract mining callbacks...\n");

// Wait until the contract callbacks execute before resuming the Geth console
//sleep(1000 * 10);		// Doesn't work












