var CharityTrust = artifacts.require("./CharityTrust.sol");

contract("CharityTrust", function(accounts) {

    it("initialize charitytrust", function() {
        return CharityTrust.deployed().then(function(instance) {
            charityTrustInstance = instance;
            charityTrustInstance.createCharity("SullivanCo", "0xc04C4e06cb44FbD63ce74D29ffC72bce03410B0a")
            return charityTrustInstance.getName("0xc04C4e06cb44FbD63ce74D29ffC72bce03410B0a");
        }).then(function(i) {
            assert.equal(i, "SullivanCo");
        })
    })

    // it("initialize charitytrust", function() {
    //     return CharityTrust.deployed().then(function(instance) {
    //         charityTrustInstance = instance;
    //         assert.equals(charityTrustInstance.created(), true);
    //     })
    // })
})