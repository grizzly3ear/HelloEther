// import { EtherJS } from "./EthersJS"
// import { RpcURL } from "./RpcURL"

const EtherJS = require('./EthersJS')
const RpcURL = require('./RpcURL')
const CoinContract = require('./CoinContract')
const DexFactory = require('./DexFactory')

const app = async () => {
    let wallet = '0x3dca07e16b2becd3eb76a9f9ce240b525451f887'
    let ether = new EtherJS(RpcURL.BSC, wallet)
    ether.observeBlock(DexFactory.PANCAKE, CoinContract.BCOIN, CoinContract.BUSD)
    // console.log(await ether.balance(CoinContract.BUSD))
    // console.log(await ether.getExchangeRate(DexFactory.PANCAKE, CoinContract.BTC, CoinContract.BUSD))
}

app()