pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Speedeum is ERC20, AccessControl {

    bytes32 public constant Manager= keccak256("Manager");
    bytes32 public constant Driver = keccak256("Driver");
    bytes32 public constant Engineer = keccak256("Engineer");
    
    address owner;

    constructor () ERC20("Speedeum","SPDM"){
        owner = msg.sender;
        _mint(msg.sender,222);
        // _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setRoleAdmin(Driver, Manager);
        _setRoleAdmin(Engineer, Manager);
        // _grantRole(Manager, Man);
        // owner = Man;
    }

    function JoinF1(address DriverAddress, address EngineerAddress) external  {

        
        _grantRole(Driver, DriverAddress);
        _grantRole(Engineer, EngineerAddress);

    }

    function demote (bytes32 role,address demoteee) public  onlyRole(Manager) {
        revokeRole(role,demoteee);
    }

    function checkRole(bytes32 role, address checkee) public view onlyRole(Manager) returns(bool){
        return hasRole(role,checkee);
    }

    function mint(uint amount) external {
        _mint(msg.sender, amount);
    }


}