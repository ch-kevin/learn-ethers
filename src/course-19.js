// provider.on("pending", listener)
import { ethers } from "ethers";

// 1. 创建provider和wallet，监听事件时候推荐用wss连接而不是http
console.log("\n1. 连接 wss RPC")
// 准备 alchemy API 可以参考https://github.com/AmazingAng/WTFSolidity/blob/main/Topics/Tools/TOOL04_Alchemy/readme.md 
const ALCHEMY_MAINNET_WSSURL = 'wss://eth-mainnet.g.alchemy.com/v2/j2mNvMqi41HfeATV1AccwsNmra-uFLru';
const provider = new ethers.providers.WebSocketProvider(ALCHEMY_MAINNET_WSSURL);
// let network = provider.getNetwork()
// network.then(res => console.log(`[${(new Date).toLocaleTimeString()}] 连接到 chain ID ${res.chainId}`));


const iface = new ethers.utils.Interface([
    "function transfer(address, uint) public returns (bool)",
])

console.log("\n2. 限制调用rpc接口速率")
// 2. 限制访问rpc速率，不然调用频率会超出限制，报错。
function throttle(fn, delay) {
    let timer;
    return function () {
        if (!timer) {
            fn.apply(this, arguments)
            timer = setTimeout(() => {
                clearTimeout(timer)
                timer = null
            }, delay)
        }
    }
}

const main = async () => {
    let i = 0;
    // // 3. 监听pending交易，获取txHash
    // console.log("\n3. 监听pending交易，打印txHash。")
    // provider.on("pending", throttle(
    //     async (txHash) => {
    //         if (txHash && i < 100) {
    //             // 打印txHash
    //             console.log(`[${(new Date).toLocaleTimeString()}] 监听Pending交易 ${i}: ${txHash} \r`);
    //             i++
    //         }
    //     }
    // ,1000));

    // 4. 监听pending交易，并获取交易详情
    // console.log("\n4. 监听pending交易，获取txHash，并输出交易详情。")
    // let j = 0
    // provider.on("pending", throttle(async (txHash) => {
    //     if (txHash && j <= 100) {
    //         // 获取tx详情
    //         let tx = await provider.getTransaction(txHash);
    //         console.log(`\n[${(new Date).toLocaleTimeString()}] 监听Pending交易 ${j}: ${txHash} \r`);
    //         console.log(tx);
    //         j++
    //     }
    // }, 1000));


    // 处理bigInt
    function handleBigInt(key, value) {
        if (typeof value === "bigint") {
            return value.toString() + "n"; // or simply return value.toString();
        }
        return value;
    }

    provider.on('pending', async (txHash) => {
        let j=1;
        if (txHash) {
            const tx = await provider.getTransaction(txHash)
            j++
            if (tx !== null && tx.data.indexOf(iface.getSighash("transfer")) !== -1) {
                console.log(`[${(new Date).toLocaleTimeString()}]监听到第${j + 1}个pending交易:${txHash}`)
                console.log(`打印解码交易详情:${JSON.stringify(iface.parseTransaction(tx), handleBigInt, 2)}`)
                console.log(`转账目标地址:${iface.parseTransaction(tx).args[0]}`)
                console.log(`转账金额:${ethers.utils.formatEther(iface.parseTransaction(tx).args[1])}`)
                provider.removeListener('pending', this)
            }
        }
    })
}

main()