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
        mapping(uint256=>uint256) goalValue;
        mapping(address=>bool) voted;
        address charityAddress;
    }


    mapping(address=>Charity) charities;

    function deposit(address payee) public payable {
        uint256 amount = msg.value;
        deposits[payee] = deposits[payee] + amount;
    }

    function withdraw(address payable payee) public {
        uint256 payment = deposits[payee];
        deposits[payee] = 0;
        payee.transfer(payment);
    }

    function createCharity(string _name, address _charityAddress) public {
        charities[_charityAddress] = Charity(_name, 3, 1, 0, 0, 0, 0, 0, 0, _charityAddress);
        charity = charities[_charityAddress];
        charity.goalValue[1] = 2;
        charity.goalValue[2] = 5;
        charity.goalValue[3] = 10;
    }

    function donate() public {

    }

    function vote(address _voterAddress, address _charityAddress) public {
        charity = charities[_charityAddress];

        // pseudo code
        if (vote == 2)
            calculateTotalFunds(_charityAddress)
    }

    function calculateTotalFunds(address _charityAddress) private {
        //loop through all donor addresss
        totalfunds
        payCharity(_charityAddress, totalFunds)
    }

    function payCharity(address payable _charityAddress, uint256 amount) private {
        //pay charity
    }

    function nextGoal() private {

    }

    function paybackDonors(Charity charity) private {
        for (i=1;i<=charity.numDonors;i++) {
            donor payable = charity.donors[i];
            donorAmount = withheldFunds[donor]
            donor.transfer(donorAmount);
        }
    }
}