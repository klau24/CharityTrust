var CharityTrust = artifacts.require("./CharityTrust.sol");

contract("CharityTrust", function(accounts) {

    it("initialize charitytrust", function() {
        return CharityTrust.deployed().then(function(instance) {
            charityTrustInstance = instance;
            assert.equals(charityTrustInstance.created(), true);
        })
    })

    // it("initialize charitytrust", function() {
    //     return CharityTrust.deployed().then(function(instance) {
    //         charityTrustInstance = instance;
    //         assert.equals(charityTrustInstance.created(), true);
    //     })
    // })
})