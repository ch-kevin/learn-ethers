import { ethers } from "ethers";


// const INFURA_MAINNET_URL = `https://mainnet.infura.io/v3/00b99ad1cd1448d6b83059081e4f6cdb`;
// const INFURA_GOERLI_URL = `https://sepolia.infura.io/v3/00b99ad1cd1448d6b83059081e4f6cdb`;


const INFURA_MAINNET_URL = "https://eth-mainnet.g.alchemy.com/v2/j2mNvMqi41HfeATV1AccwsNmra-uFLru"
const INFURA_GOERLI_URL = `https://eth-sepolia.g.alchemy.com/v2/j2mNvMqi41HfeATV1AccwsNmra-uFLru`;



// 提供器 provider 创建
const minProvider = new ethers.providers.JsonRpcProvider(INFURA_MAINNET_URL);
const testProvider = new ethers.providers.JsonRpcProvider(INFURA_GOERLI_URL);

const displayWETHcontarctInfo = async()=>{
    // main
    const mainAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const mainABI = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function totalSupply() view returns (uint256)",
        "function balanceOf(address) view returns (uint)",
    ]
    const mainWETHcontarct = await new ethers.Contract(mainAddress,mainABI,minProvider);
    console.log("mainnet name=>",await mainWETHcontarct.name());
    console.log("mainnet symbol=>",await mainWETHcontarct.symbol());
   

    const totalSupply=await mainWETHcontarct.totalSupply();
    console.log("mainnet totalSupply=>",`${ethers.utils.formatEther(totalSupply)} WETH`);
    const balance  = await mainWETHcontarct.balanceOf("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")
    console.log(`ETH Balance of vitalik: ${ethers.utils.formatEther(balance)} WETH`);

    

     
    //test
    // const spoliaTestAddress = "0x187923DcF636E4990fF79fCDfE9821d498D001D7";
    // const spoliaABIAddress = [
    //     "function totalSupply() public view returns (uint)",
    //     "function name() public view returns (string)",
    //     "function getSymbol() public view returns (string)",
    //     "function getDecimals() public view returns (uin8)"
    // ]
    // const spoliaWETHcontarct = await new ethers.Contract(spoliaTestAddress,mainABI,testProvider);

    // console.log("testnet getName=>",await spoliaWETHcontarct.getSymbol());


    // wallet  random
    const walletReadom = await new ethers.Wallet.createRandom();
    // wallet  priviteKey
    const priviteKey = "";
    const providerC = "";
    const walletPriviteKey =await new ethers.wallet(priviteKey,minProvider);

    //wall 助记词;
    const mnemonic = ""
    // const wallet3 = ethers.Wallet.fromMnemonic(mnemonic);

    //wall json
    const json ="";
    // const wallet4 = ethers.Wallet.fromEncryptedJson(json);


    // tx 交易
    const tx = {
        to: "",
        value: ethers.utils.parseEther(0.001)
    }

    const receipt = await walletPriviteKey.sentTransation(tx);
    await receipt.wait();
    console.log("receipt==>",receipt)
    
}
const main = async () => {
    displayWETHcontarctInfo()
}
main();