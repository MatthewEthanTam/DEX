pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract Wallet is Ownable{

    struct token {
        bytes32 ticker;
        address payable  tokenAddress;
    }
    mapping (bytes32 => token) public tokenMapping;
    bytes32[] public tokenList;
    mapping(address=>mapping(bytes32=>uint256)) public balances;

    function addToken(bytes32 ticker, address tokenAddress) external onlyOwner {
        tokenMapping[ticker] = token(ticker,payable(tokenAddress));
        tokenList.push(ticker);
    }

    function deposit (uint amount, bytes32 ticker) external {
        require(tokenMapping[ticker].tokenAddress != address(0));
        IERC20(tokenMapping[ticker].tokenAddress).transferFrom(msg.sender, address(this), amount);
        balances[msg.sender][ticker] += amount;
    }

    function withdraw(uint amount, bytes32 ticker) external {
        require(tokenMapping[ticker].tokenAddress != address(0), "Token does not exist");
        require(balances[msg.sender][ticker]>=amount,"not enough currency");
        balances[msg.sender][ticker] -= amount;
        IERC20(tokenMapping[ticker].tokenAddress).transfer(msg.sender,amount);
    } 
     function depositEth() payable external {
        balances[msg.sender][bytes32("ETH")] = balances[msg.sender][bytes32("ETH")] + (msg.value);
    }
    
}