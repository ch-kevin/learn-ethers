import { ethers } from "ethers";

/*
    calldata 调用代理合约;

    通过 interface调用;

*/
const INFURA_GOERLI_URL = `https://eth-sepolia.g.alchemy.com/v2/j2mNvMqi41HfeATV1AccwsNmra-uFLru`
const provider = await new ethers.providers.JsonRpcProvider(INFURA_GOERLI_URL)
const priviteKey = "9c4e8859a9b79d8b0d882eadc45433d71d9aa3879dbdb2e519e61842fbb3fc93"
const wallet = await new ethers.Wallet(priviteKey,provider);

const contarctAddress = "0x7b79995e5f793a07bc00c21412e50ecae098e7f9" //WETH
const contractABI = [
    "function balanceOf(address) public view returns(uint)",
    "function deposit() public payable",
]
const contarct = await new ethers.Contract(contarctAddress,contractABI,wallet);


// const interface1 = provider.interface(contractABI)
// const interface2 = contarct.interface

const main = async ()=>{
    // interface 有四个mentod;
    // 1, interface.get
    // const hash = interface1.getSighash("balanceOf");
    // 2, 编码构造器
    // interface1.encodeDeploy("Wrapped ETH", "WETH");
    // 3, 编码函数的 calldatae; 
    // const hash3 = interface1.encodeFunctionData("balanceOf",["0xc778417e063141139fce010982780140aa0cd5ab"]);
    // const result = interface1.decodeFunctionResult("balanceOf",resultData)

    const address = await wallet.getAddress()
    console.log("钱包地址:",address)
    console.log("\n1. 读取WETH余额")
    // 编码calldata；

    const param1 = contarct.interface.encodeFunctionData(
        "balanceOf",
        [address]
    )

    console.log(`编码结果： ${param1}`)

    // 创建交易
    const tx1 ={
        to: contarctAddress,
        data: param1
    }

    // 发起交易，可读操作（view/pure）可以用 provider.call(tx)
    const balanceWETH = await provider.call(tx1)
    console.log(`存款前WETH持仓: ${ethers.utils.formatEther(balanceWETH)}\n`)

    const param2 = contarct.interface.encodeFunctionData(
        "deposit"
    )
    console.log(`编码结果： ${param2}`)
    const tx2 = {
        to: contarctAddress,
        data: param2,
        value: ethers.utils.parseEther("0.0001")
    }
    const receipt1 = await wallet.sendTransaction(tx2)
    await receipt1.wait()
    console.log(`交易详情：`)
    console.log(receipt1)
    const balanceWETH_deposit = await contarct.balanceOf(address)
    console.log(`存款后WETH持仓: ${ethers.utils.formatEther(balanceWETH_deposit)}\n`)
    
   
}
main();