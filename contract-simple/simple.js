var contractOutput = {
  "contracts" : {
    "contract-simple/simple.sol:Simple" : {
      "abi" :
          "[{\"constant\":false,\"inputs\":[{\"name\":\"_a\",\"type\":\"uint256\"},{\"name\":\"_b\",\"type\":\"uint256\"}],\"name\":\"multiply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"rooms\",\"outputs\":[{\"name\":\"whosTurnId\",\"type\":\"uint256\"},{\"name\":\"roomState\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"total\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"createRoom\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"i\",\"type\":\"uint256\"}],\"name\":\"getRoomPlayers\",\"outputs\":[{\"name\":\"\",\"type\":\"address[]\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"increment\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"index\",\"type\":\"uint256\"},{\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"setLocal\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256[]\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_a\",\"type\":\"uint256\"},{\"name\":\"_b\",\"type\":\"uint256\"}],\"name\":\"arithmetics\",\"outputs\":[{\"name\":\"o_sum\",\"type\":\"uint256\"},{\"name\":\"o_product\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"incrementOne\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"incrementReturn\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_from\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"OnCreateRoom\",\"type\":\"event\"}]",
      "bin" :
          "60806040526000805534801561001457600080fd5b50610598806100246000396000f3006080604052600436106100a35763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663165c4a1681146100a85780631bae0ac8146100d55780632ddbd13a146101065780633be272aa1461011b57806343925cc3146101325780637cf5dab01461019a5780638521eb2b146101b25780638c12d8f0146101cd578063a4fecdf6146101e8578063b25f301e146101fd575b600080fd5b3480156100b457600080fd5b506100c3600435602435610212565b60408051918252519081900360200190f35b3480156100e157600080fd5b506100ed600435610216565b6040805192835260208301919091528051918290030190f35b34801561011257600080fd5b506100c3610248565b34801561012757600080fd5b5061013061024e565b005b34801561013e57600080fd5b5061014a60043561036a565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561018657818101518382015260200161016e565b505050509050019250505060405180910390f35b3480156101a657600080fd5b506101306004356103f2565b3480156101be57600080fd5b5061014a6004356024356103fd565b3480156101d957600080fd5b506100ed600435602435610477565b3480156101f457600080fd5b50610130610480565b34801561020957600080fd5b506100c361048b565b0290565b600180548290811061022457fe5b90600052602060002090600302016000915090508060010154908060020154905082565b60005481565b61025661049a565b5060408051600060608201818152608083018452825260208083018290529282018190526001805480820180835591909252825180519394919385936003027fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf601926102c69284929101906104bc565b5060208201518160010155604082015181600201555050506001808080549050038154811015156102f357fe5b600091825260208083206003909202909101805460018101825590835281832001805473ffffffffffffffffffffffffffffffffffffffff191633908117909155604080519384525190927f6ed433b01ad996434aefa8a7111140198d355eeb8a20f5abc120b78d55ff036f92908290030190a250565b606060018281548110151561037b57fe5b600091825260209182902060039091020180546040805182850281018501909152818152928301828280156103e657602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff1681526001909101906020018083116103bb575b50505050509050919050565b600080549091019055565b6060600082818581548110151561041057fe5b90600052602060002001819055508080548060200260200160405190810160405280929190818152602001828054801561046957602002820191906000526020600020905b815481526020019060010190808311610455575b505050505091505092915050565b81810192910290565b600080546001019055565b60008054600101908190555b90565b6060604051908101604052806060815260200160008152602001600081525090565b82805482825590600052602060002090810192821561052b579160200282015b8281111561052b578251825473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff9091161782556020909201916001909101906104dc565b5061053792915061053b565b5090565b61049791905b8082111561053757805473ffffffffffffffffffffffffffffffffffffffff191681556001016105415600a165627a7a7230582036240fd61ee767497a291804e11b713ee8c998f4b11fdb19e0c0296a856e562f0029"
    }
  },
  "version" : "0.4.25+commit.59dbf8f1.Darwin.appleclang"
}
