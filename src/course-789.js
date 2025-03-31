import { ethers } from "ethers";

const INFURA_GOERLI_URL = `https://eth-mainnet.g.alchemy.com/v2/j2mNvMqi41HfeATV1AccwsNmra-uFLru`
const provider = await new ethers.providers.JsonRpcProvider(INFURA_GOERLI_URL)
const priviteKey = "9c4e8859a9b79d8b0d882eadc45433d71d9aa3879dbdb2e519e61842fbb3fc93"
const wallet = await new ethers.Wallet(priviteKey,provider)

const conractbintcoin = "0xdac17f958d2ee523a2206206994597c13d831ec7"
const ABI = [
    "event  Transfer(address indexed src, address indexed dst, uint wad)",
]
const contract = await new ethers.Contract(conractbintcoin,ABI,provider);


const main = async()=>{
    const block = await provider.getBlockNumber()
    console.log(`当前区块高度: ${block}`);
    console.log(`打印事件详情:`);
    const txEvents = await contract.queryFilter("Transfer",block -10 ,block)
    const amount = ethers.utils.formatUnits(txEvents[0].args[2], "ether");
    console.log(`地址 ${txEvents[0].args[0]} 转账${amount} WETH 到地址 ${txEvents[0].args[1]}`)

    contract.once('Transfer', (from, to, value)=>{
        // 打印结果
        console.log(
          `once ==> ${from} -> ${to} ${ethers.utils.formatUnits(value,6)}`
        )
    })

    // contract.on('Transfer', (from, to, value)=>{
    //     // 打印结果
    //     console.log(
    //       `on ===>${from} -> ${to} ${ethers.utils.formatUnits(value,6)}`
    //     )
    // })
    const filterBinanceIn = contract.filters.Transfer("0x28C6c06298d514Db089934071355E5743bf21d60")

    console.log("过滤器详情：")
    console.log(filterBinanceIn);

    contract.on(filterBinanceIn, (from, to, value)=>{
        // 打印结果
        console.log(
          `filter ===>${from} -> ${to} ${ethers.utils.formatUnits(value,6)}`
        )
    })


    // formatUnits  parseUnits parseEther
    
}
main();