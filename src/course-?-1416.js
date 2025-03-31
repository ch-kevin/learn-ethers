import { ethers } from "ethers";


// HD  BIP32 BIT44 批量生产钱包

const main = async ()=>{
    // 随机生成助记词;
    const mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(32));
    console.log("mnemonic",mnemonic);

    // 基路径："m / purpose' / coin_type' / account' / change"
    // "m/44'/60'/0'/0/0"
    const baseWallet = ethers.utils.HDNode.fromMnemonic(mnemonic)
    console.log(baseWallet);

    const numWallet = 20
    // 派生路径：基路径 + "/ address_index"
    // 我们只需要提供最后一位address_index的字符串格式，就可以从baseWallet派生出新钱包。V6中不需要重复提供基路径！
    let wallets = [];
    for (let i = 0; i < numWallet; i++) {
        let baseWalletNew = baseWallet.derivePath(i.toString());
        console.log(`第${i+1}个钱包地址： ${baseWalletNew.address}`)
        wallets.push(baseWalletNew);
    }

}
main()