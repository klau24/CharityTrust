pragma solidity >=0.4.21 <0.7.0;
contract CharityTrust {
    struct Charity {
        string name;
        uint256 numGoals;
        uint256 currGoal;
        uint256 numOfDonors;
        uint256 yesVotes;
        uint256 totalVotes;
        address charityAddress;
        mapping(uint256=>address payable) donors;
        mapping(address=>uint256) withheldFunds;
        mapping(address=>bool) voted;
    }

    mapping(address=>Charity) public charities;

    function createCharity(string memory _name, address payable _charityAddress) public {
        charities[_charityAddress] = Charity(_name, 3, 1, 0, 0, 0, _charityAddress);
    }

    function getName(address payable _charityAddress) public view returns (string memory) {
        Charity memory charity = charities[_charityAddress];
        return charity.name;
    }

    function donate(address payable _donorAddress, address payable _charityAddress) public payable {
        uint256 amount = msg.value;
        Charity storage charity = charities[_charityAddress];
        charity.numOfDonors++;
        charity.donors[charity.numOfDonors] = _donorAddress;
        charity.withheldFunds[_donorAddress] = charity.withheldFunds[_donorAddress] + amount;
    }

    function vote(address _voterAddress, address payable _charityAddress, bool yes) public {
        Charity storage charity = charities[_charityAddress];
        require(!charity.voted[_voterAddress], "Person voted already");
        charity.voted[_voterAddress] = true;
        charity.totalVotes ++;
        require(yes, "This person voted no");
        charity.yesVotes ++;

        // pseudo code
        if (charity.totalVotes >= 4 && calculateThreshold(charity.yesVotes, charity.totalVotes)) {
            calculateTotalFunds(_charityAddress);
        }
        else if (charity.totalVotes == 10) {
            paybackDonors(charity);
        }
    }

    function calculateThreshold(uint256 yes, uint256 total) private pure returns (bool){
        return ((yes * 100000) / total) >= 70000;
    }

    function calculateTotalFunds(address payable _charityAddress) private {
        //loop through all donor addresss
        Charity storage charity = charities[_charityAddress];
        uint256 totalFunds;
        uint256 i;

        for (i = 1; i <= charity.numOfDonors; i++) {
            address donor = charity.donors[i];
            uint256 amount = charity.withheldFunds[donor] / 3;
            charity.withheldFunds[donor] = charity.withheldFunds[donor] - amount;
            totalFunds = totalFunds + amount;
            charity.voted[donor] = false;
        }

        payCharity(_charityAddress, totalFunds);
    }

    function payCharity(address payable _charityAddress, uint256 amount) private {
        //pay charity
        Charity storage charity = charities[_charityAddress];

        charity.currGoal++;
        charity.yesVotes = 0;
        charity.totalVotes = 0;

        _charityAddress.transfer(amount);
    }

    function paybackDonors(Charity storage charity) private {
        uint256 i;
        address payable donor;

        for (i = 1; i <= charity.numOfDonors; i++) {
            donor = charity.donors[i];
            uint256 donorAmount = charity.withheldFunds[donor];
            donor.transfer(donorAmount);
        }

        charity.yesVotes = 0;
        charity.totalVotes = 0;
    }
}