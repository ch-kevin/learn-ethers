import { ethers } from "ethers";


const INFURA_MAINNET_URL = "https://eth-mainnet.g.alchemy.com/v2/j2mNvMqi41HfeATV1AccwsNmra-uFLru"
const INFURA_GOERLI_URL = `https://eth-sepolia.g.alchemy.com/v2/j2mNvMqi41HfeATV1AccwsNmra-uFLru`;



// 提供器 provider 创建
const minProvider = new ethers.providers.JsonRpcProvider(INFURA_MAINNET_URL);
const testProvider = new ethers.providers.JsonRpcProvider(INFURA_GOERLI_URL);

// wallet  random
const walletReadom = new ethers.Wallet.createRandom();
const wallet1WithProvider = walletReadom.connect(testProvider);
const mnemonic = walletReadom.mnemonic;
// wallet  priviteKey
const priviteKey = "9c4e8859a9b79d8b0d882eadc45433d71d9aa3879dbdb2e519e61842fbb3fc93";
const walletPriviteKey =await new ethers.Wallet(priviteKey,testProvider);

//wall 助记词;
const wallet3 = ethers.Wallet.fromMnemonic(mnemonic.phrase);

//wall json
const json ="";
// const wallet4 = ethers.Wallet.fromEncryptedJson(json);



const displayWETHcontarctInfo = async()=>{


    const address1 = walletReadom.getAddress();
    const address2 = walletPriviteKey.getAddress();
    const address3 = wallet3.getAddress();
    console.log("1,获取钱包地址")
    console.log("address1",address1);
    console.log("address2",address2);
    console.log("address3",address3);
    console.log("address1 === address3",address1==address3);

    console.log("2,助记词")
    console.log("walletReadom.mnemonic",walletReadom.mnemonic.phrase);

    console.log("4,获取私钥")
    console.log("钱包一",walletReadom.priviteKey);
    console.log("钱包二",walletReadom.priviteKey);

    console.log("5,连上交易次数")
    const txCount1 = await wallet1WithProvider.getTransactionCount();
    const txCount2 = await walletPriviteKey.getTransactionCount();
    console.log(`钱包1发送交易次数: ${txCount1}`)
    console.log(`钱包2发送交易次数: ${txCount2}`)

    
    console.log(`6. 发送ETH（测试网）`);
    // i. 打印交易前余额
    console.log(`i. 发送前余额`)

    {
        const getBalance1 = await wallet1WithProvider.getBalance();
        const getBalance2 = await walletPriviteKey.getBalance();
    
        console.log(`钱包1余额: ${ethers.utils.formatEther(getBalance1)}`);
        console.log(`钱包2余额: ${ethers.utils.formatEther(getBalance2)}`);
    }
    // tx 交易
    const tx = {
        to: address1,
        value: ethers.utils.parseEther("0.000000000001")
    }

    const receipt = await walletPriviteKey.sendTransaction(tx);
    await receipt.wait();
    console.log("receipt==>",receipt)
    // iv. 打印交易后余额
    console.log(`\niii. 发送后余额`)
    {
        const getBalance1 = await wallet1WithProvider.getBalance();
        const getBalance2 = await walletPriviteKey.getBalance();
    
        console.log(`钱包1 余额: ${ethers.utils.formatEther(getBalance1)}`);
        console.log(`钱包2 余额: ${ethers.utils.formatEther(getBalance2)}`);
    }
    
}
const main = async () => {
    displayWETHcontarctInfo()
}
main();