pragma solidity >=0.4.22 <0.7.0;

contract Transaction {
     
    uint yes_votes;
    uint voteTotal;
    uint increment_amount;
    uint number_of_goals;
    uint public contract_balance;
    address donator_address;
    address company_address;
    
    mapping (address => bool) didTheyVote;
    mapping (address => uint) balances;

    event Transfer(address indexed from, address indexed to, uint tokens);
    

    constructor(address donator, address company, uint balance, uint goals) public{
        donator_address = donator;
        company_address = company;
        contract_balance = balance;
        require(contract_balance > 0, "The transaction amount must be greater than 0.");
        number_of_goals = goals;
        voteTotal = 0;
        increment_amount = balance / number_of_goals;
    }

    function addVote(address voter_address, bool yes_vote) public{
        require(!didTheyVote[voter_address]);
        didTheyVote[voter_address] = true;
        voteTotal ++;
        require(yes_vote);
        yes_votes ++;
    }

    function sendByIncrement() public{
        require(contract_balance != 0);
        // require(yes_votes * 100000 / voteTotal >= 70000); // 70% voting threshold
        balances[donator_address] = balances[donator_address] - increment_amount;
        balances[company_address] = balances[company_address] + increment_amount;
        contract_balance -= increment_amount;
        emit Transfer(donator_address, company_address, increment_amount);
    }

    function getDonator() public view returns (address) {
        return donator_address;
    }

    function getCompany() public view returns (address) {
        return company_address;
    }

    function getDonatorBalance() public view returns (uint) {
        return donator_address.balance;
    }

    function getCompanyBalance() public view returns (uint) {
        return company_address.balance;
    }
}