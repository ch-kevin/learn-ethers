import { ethers } from "ethers";
// v 0xd8da6bf26964af9d7eed9e03e53415d37aa96045
const main = async ()=>{

    var wallet // 钱包
    // const regex = /^0xwenkai.*$/ // 表达式

    const regex = /^0xwk.*$/i // 表达式

    var isValid = false
    while(!isValid){
        wallet = ethers.Wallet.createRandom() // 随机生成钱包，安全
        isValid = regex.test(wallet.address) || 
        /^0xwk/i.test(wallet.address) ||
        /^0xwen/i.test(wallet.address) ||
        /^0xkevin/i.test(wallet.address) ||
        /^0x0000/i.test(wallet.address) ||
        /^0x1{5}/i.test(wallet.address) ||
        /^0x2{5}/i.test(wallet.address) ||
        /^0x3{4}/i.test(wallet.address) ||
        /^0x6{4}}/i.test(wallet.address) ||
        /^0x5{5}/i.test(wallet.address) ||
        /^0x7{4}/i.test(wallet.address) ||
        /^0x8{5}}/i.test(wallet.address) ||
        /^0x9{5}/i.test(wallet.address) ||

        /.*we$/i.test(wallet.address) ||
        /.*wen$/i.test(wallet.address) ||
        /.*wk$/i.test(wallet.address) ||
        /.*kai$/i.test(wallet.address) ||
        /.*kevin$/i.test(wallet.address) ||

        /.*0{4}}$/i.test(wallet.address) ||
        /.*1{4}$/i.test(wallet.address) ||
        /.*2{5}$/i.test(wallet.address) ||
        /.*3{4}}$/i.test(wallet.address) ||
        /.*5{4}}$/i.test(wallet.address) ||
        /.*6{4}$/i.test(wallet.address) ||
        /.*7{4}$/i.test(wallet.address) ||
        /.*8{4}$/i.test(wallet.address) ||
        /.*9{5}$/i.test(wallet.address) ||
        console.log("address==>",wallet.address)
    }
    // 打印靓号地址与私钥
    console.log(`\n靓号地址：${wallet.address}`)
    console.log(`靓号私钥：${wallet.privateKey}\n`)
    
}
main()