pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./Wallet.sol";
import "./nf1tCurrency.sol";
contract Dex is Wallet {
    uint public nextOrderId;
    enum Side {
        BUY,
        SELL
    }
    struct Order {
        uint id;
        address trader;
        Side buyOrder;
        bytes32 ticker;
        uint amount;
        uint price;
    }
    mapping (bytes32 => mapping(uint => Order[])) public orderBook;

    function getOrderBook(bytes32 ticker, Side side) view public returns (Order[] memory) {
        return orderBook[ticker][uint(side)];
    }

    function createLimitOrder(Side side,uint price, uint amount, bytes32 ticker) external {
            if (side == Side.BUY) {
                require(balances[msg.sender]["ETH"] >= amount*price, "not enough eth");
            } else if (side == Side.SELL){
                require(balances[msg.sender][ticker] >= amount, "not enough currency");
            }
            Order[] storage orders = orderBook[ticker][uint(side)];
            orders.push(Order(nextOrderId, msg.sender,side,ticker,amount,price));
            nextOrderId++;
            // orders = bubbleSort(orders,side);
            
    }

    function bubbleSort(Order[] storage orders , Side side) internal returns (Order[] storage sortedOrder) {

        for (uint i = 0;i<orders.length;i++) {
            for (uint j = i+1; j<orders.length;j++) {
                Order memory tmp;
                if (side == Side.BUY) {
                    if (orders[i].price < orders[j].price) {
                        tmp = orders[i];
                        orders[i] = orders[j];
                        orders[j] = tmp;
                    }
                } else if (side == Side.SELL) {
                    if (orders[i].price > orders[j].price) {
                        tmp = orders[i];
                        orders[i] = orders[j];
                        orders[j] = tmp;
                    }
                }
            }
        }
        return orders;
    }
}