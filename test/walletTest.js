const DexWallet = artifacts.require("Dex")
const Speedeum = artifacts.require("Speedeum")
const truffleAssert = require('truffle-assertions');

contract("Dex",accounts => {
    it("should only be possible for owner to add tokens", async() => {
        // await deployer.deploy(Speedeum);
        let dex = await DexWallet.deployed()
        let speed = await Speedeum.deployed()
        await truffleAssert.passes(
            dex.addToken(web3.utils.fromUtf8(speed.symbol()), speed.address, {from:accounts[0]})
        )
        await truffleAssert.reverts(
            dex.addToken(web3.utils.fromUtf8(speed.symbol()), speed.address, {from:accounts[1]})
        )
    })

    it("should handle deposits correctly", async() => {
        // await deployer.deploy(Speedeum);
        let dex = await DexWallet.deployed()
        let speed = await Speedeum.deployed()
        await speed.approve(dex.address, 140),
        await dex.deposit(80,web3.utils.fromUtf8(speed.symbol()))
        assert.equal( await dex.balances(accounts[0],web3.utils.fromUtf8(speed.symbol())),80)
        
        
    })

    it("should handle faulty withdrawls correctly", async() => {
        // await deployer.deploy(Speedeum);
        let dex = await DexWallet.deployed()
        let speed = await Speedeum.deployed()
        await truffleAssert.reverts(dex.withdraw(500,web3.utils.fromUtf8(speed.symbol())))
    })

    it("should handle correct withdrawls correctly", async() => {
        // await deployer.deploy(Speedeum);
        let dex = await DexWallet.deployed()
        let speed = await Speedeum.deployed()
        await truffleAssert.passes(dex.withdraw(10,web3.utils.fromUtf8(speed.symbol())))
    })

    //check if you have enough eth to buy.
    it("should have enough ETH to buy", async() => {
        // await deployer.deploy(Speedeum);
        let dex = await DexWallet.deployed()
        let speed = await Speedeum.deployed()
        
        await truffleAssert.reverts(dex.createLimitOrder(0,300,1,web3.utils.fromUtf8(speed.symbol())))
        dex.depositEth({value: 30})
        await truffleAssert.passes(dex.createLimitOrder(0,30,1,web3.utils.fromUtf8(speed.symbol())))
    })

    //check if enough eth to sell in sell order.
    it("should have enough currency to sell", async() => {
        // await deployer.deploy(Speedeum);
        let dex = await DexWallet.deployed()
        let speed = await Speedeum.deployed()
        await truffleAssert.passes(dex.createLimitOrder(1,30,1,web3.utils.fromUtf8(speed.symbol())))
        await truffleAssert.reverts(dex.createLimitOrder(1,300,90,web3.utils.fromUtf8(speed.symbol())))
    })
    //buy book in decending order.
    // it("should be in decending order buy book", async() => {
    //     // await deployer.deploy(Speedeum);
    //     let dex = await DexWallet.deployed()
    //     let speed = await Speedeum.deployed()
    //     dex.depositEth({value: 500})
        
    //     await dex.createLimitOrder(0,300,1,web3.utils.fromUtf8(speed.symbol()))
    //     await dex.createLimitOrder(0,100,1,web3.utils.fromUtf8(speed.symbol()))
    //     await dex.createLimitOrder(0,200,1,web3.utils.fromUtf8(speed.symbol()))
        
    //     let orderBook = await dex.getOrderBook(web3.utils.fromUtf8(speed.symbol()),0);
    //     console.log(orderBook[0].price)
    //     console.log(orderBook[1].price)
    //     console.log(orderBook[2].price)
    //     assert(orderBook.length>0)
    //     for (let i = 0; i< orderBook.length -1;i++) {
    //         assert(orderBook[i].price >= orderBook[i+1].price, "not right order in buy book")
    //     }
        
    // })
    
    //sell book in decending order.
    // it("should be in acending order sell book", async() => {
    //     // await deployer.deploy(Speedeum);
    //     let dex = await DexWallet.deployed()
    //     let speed = await Speedeum.deployed()

    //     await speed.approve(dex.address,500)
    //     await dex.createLimitOrder(1,300,1,web3.utils.fromUtf8(speed.symbol()))
    //     await dex.createLimitOrder(1,100,1,web3.utils.fromUtf8(speed.symbol()))
    //     await dex.createLimitOrder(1,200,1,web3.utils.fromUtf8(speed.symbol()))

    //     let orderBook = await dex.getOrderBook(web3.utils.fromUtf8(speed.symbol()),0);
    //     console.log(orderBook[0].price)
    //     console.log(orderBook[1].price)
    //     console.log(orderBook[2].price)
    //     assert(orderBook.length>0)
    //     for (let i = 0; i< orderBook.length -1;i++) {
            
    //         assert(orderBook[i].price <= orderBook[i+1].price, "not right order in buy book")
    //     }
        
    // })
})