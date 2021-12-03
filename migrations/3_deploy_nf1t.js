const Speedeum = artifacts.require("Speedeum");
const Wallet = artifacts.require("Wallet");
module.exports = async function (deployer, network, accounts) {

  await deployer.deploy(Speedeum);
  // let wallet = await Wallet.deployed()
  // let speed = await Speedeum.deployed()

  // console.log(await speed.balanceOf(accounts[0]))
  // await speed.mint(20);
  
  // await wallet.addToken(web3.utils.fromUtf8(speed.symbol()),speed.address)
  // console.log(speed.address) 
  // console.log(await wallet.tokenMapping(web3.utils.fromUtf8(speed.symbol())))
  // await speed.approve(wallet.address,140)
  // await wallet.deposit(20, web3.utils.fromUtf8(speed.symbol()))
  // console.log(await speed.balanceOf(accounts[0]))
  // await speed.allowance(accounts[0],wallet.address)
  // console.log(await wallet.balances(accounts[0],web3.utils.fromUtf8(speed.symbol())))

};