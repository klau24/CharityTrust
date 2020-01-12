pragma solidity >=0.4.21 <0.7.0;

contract CharityTrust {
    struct Charity {
        string name;
        uint256 numGoals;
        uint256 currGoal;
        uint256 numOfDonors;
        mapping(uint256=>address) donors;
        mapping(address=>uint256) withheldFunds;
        mapping(uint256=>uint256) goalCount;
        mapping(address=>bool) voted;
        address charityAddress;
    }

    mapping(address=>Charity) charities;

    constructor () public {
    }

    function deposit(address payee) public payable {
        uint amount = msg.value;
        deposits[payee] = deposits[payee] + amount;
    }

    function withdraw(address payable payee) public {
        uint256 payment = deposits[payee];
        deposits[payee] = 0;
        payee.transfer(payment);
    }

    function createCharity() public {

    }

    function donate() public {

    }

    function vote() public {

    }
    
    function calculateThreshold() private {

    }

    function calculateTotalFunds() private {

    }

    function payCharity() private {
        calculateTotalFunds()
    }

    function nextGoal() private {

    }

    function paybackDonors(Charity charity) private {
        for (i=1;i<=charity.numDonors;i++) {
            address payable donor = charity.donors[i];
            uint256 donorAmount = withheldFunds[donor]
            donor.transfer(donorAmount);
        }
    }
}