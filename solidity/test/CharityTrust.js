var CharityTrust = artifacts.require("./CharityTrust.sol");

contract("CharityTrust", function(accounts) {
    // Key 1: 0xc04C4e06cb44FbD63ce74D29ffC72bce03410B0a
    // Key 2: 0x790e07973299dC6154A0b693756CC37A4F2fc409
    // Key 3: 0x0834BBE0c0b492e6A6b285b58E9EB0CBfACB5aAC
    // Key 4: 0x1dc632f6Bb919ffFe3D448eFebCFF0BAbf26FC6d


    it("initialize charitytrust and check name", function() {
        return CharityTrust.deployed().then(function(instance) {
            charityTrustInstance = instance;
            charityTrustInstance.createCharity("SullivanCo", "0xc04C4e06cb44FbD63ce74D29ffC72bce03410B0a")
            return charityTrustInstance.getName("0xc04C4e06cb44FbD63ce74D29ffC72bce03410B0a");
        }).then(function(i) {
            assert.equal(i, "SullivanCo");
        })
    })

    it("basic voting functionality TRUE CASE", function() {
        return CharityTrust.deployed().then(function(instance) {
            charityTrustInstance = instance;
            charityTrustInstance.createCharity("SullivanCo", "0xc04C4e06cb44FbD63ce74D29ffC72bce03410B0a")
            charityTrustInstance.vote("0x790e07973299dC6154A0b693756CC37A4F2fc409", "0xc04C4e06cb44FbD63ce74D29ffC72bce03410B0a", true);
            charityTrustInstance.vote("0x0834BBE0c0b492e6A6b285b58E9EB0CBfACB5aAC", "0xc04C4e06cb44FbD63ce74D29ffC72bce03410B0a", true);
            return charityTrustInstance.getVoted("0xc04C4e06cb44FbD63ce74D29ffC72bce03410B0a", "0x790e07973299dC6154A0b693756CC37A4F2fc409")
        }).then(function(i) {
            assert.equal(i, true);
            return charityTrustInstance.getTotalVotes("0xc04C4e06cb44FbD63ce74D29ffC72bce03410B0a");
        }).then(function(i) {
            assert.equal(i, 2);
        })
    })

    it("basic voting functionality FALSE CASE", function() {
        return CharityTrust.deployed().then(function(instance) {
            charityTrustInstance = instance;
            charityTrustInstance.createCharity("SullivanCo", "0xc04C4e06cb44FbD63ce74D29ffC72bce03410B0a")
            return charityTrustInstance.getVoted("0xc04C4e06cb44FbD63ce74D29ffC72bce03410B0a", "0x1dc632f6Bb919ffFe3D448eFebCFF0BAbf26FC6d")
        }).then(function(i) {
            assert.equal(i, false);
        })
    })

    // it("initialize charitytrust and check getTotalVoted", function() {
    //     return CharityTrust.deployed().then(function(instance) {
    //         charityTrustInstance = instance;
    //         charityTrustInstance.createCharity("SullivanCo", "0xc04C4e06cb44FbD63ce74D29ffC72bce03410B0a")
    //     })
    // })
})