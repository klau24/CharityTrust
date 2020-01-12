var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

web3.eth.getBalance("0xc04C4e06cb44FbD63ce74D29ffC72bce03410B0a")
    .then(function(data) {
        console.log(`Balance: ${data}`);
    })
    .catch(function(err) {
        console.log(err);
    });