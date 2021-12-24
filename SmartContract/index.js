class SmartContract {
    static getBalance = 'function balanceOf(address account) external view returns (uint256)'
    static getPair = 'function getPair(address tokenA, address tokenB) external view returns (address pair)'
    static getReserves = 'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)'
}

module.exports = SmartContract