const { ethers } = require('ethers')
const SmartContract = require('../SmartContract')

class EtherJS {
    constructor(url, wallet) {
        this.provider = new ethers.providers.JsonRpcProvider(url)
        this.wallet = wallet
    }

    balance = async (contract) => {
        let coinContract = new ethers.Contract(
            contract, 
            [SmartContract.getBalance], 
            this.provider
        )

        let tokenBalance = await coinContract.balanceOf(this.wallet)
        return ethers.utils.formatUnits(tokenBalance)
    }

    gasBalance = async () => {
        let gasBalance = await this.provider.getBalance(this.wallet)
        return ethers.utils.formatEther(gasBalance)
    }

    getExchangeRate = async (factory, coinA, coinB) => {
        const factoryContract = new ethers.Contract(
            factory, 
            [SmartContract.getPair],
            this.provider
        )
        const pairAddr = await factoryContract.getPair(coinA, coinB)
        const pairContract = new ethers.Contract(
            pairAddr,
            [SmartContract.getReserves],
            this.provider
        )

        const resevePrice = await pairContract.getReserves()
        const price = resevePrice[1] / resevePrice[0]

        return {
            coinA: 1,
            coinB: price
        }
    }

    observeBlock = (factory, coinA, coinB) => {
        let block = 'block'
        this.provider.on(block, async (block) => {
            const price = await this.getExchangeRate(factory, coinA, coinB)
            console.log(price, block)
        })
    }


}

module.exports = EtherJS