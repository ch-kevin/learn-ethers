import { ethers } from "ethers";


const main = async () => {

    //const INFURA_MAINNET_URL = "https://eth-mainnet.g.alchemy.com/v2/j2mNvMqi41HfeATV1AccwsNmra-uFLru"
    const INFURA_GOERLI_URL = `https://eth-sepolia.g.alchemy.com/v2/j2mNvMqi41HfeATV1AccwsNmra-uFLru`

    const provider = await new ethers.providers.JsonRpcProvider(INFURA_GOERLI_URL)
    const priviteKey = "9c4e8859a9b79d8b0d882eadc45433d71d9aa3879dbdb2e519e61842fbb3fc93"
    const wallet = new ethers.Wallet(priviteKey, provider);

    // 可读合约
    const contarctAddress = "0x7b79995e5f793a07bc00c21412e50ecae098e7f9"  //WTHS ERC20
    const contarctABI = [
        "function balanceOf(address) public view returns(uint)",
        "function deposit() public payable",
        "function transfer(address, uint) public returns (bool)",
        "function withdraw(uint) public",
    ]
    const contractWeth = await new ethers.Contract(contarctAddress, contarctABI, wallet);
    // contractWeth.connect(wallet); //  没启作用

    /// 读取账户余额
    const address = await wallet.getAddress();
    console.log(`读取账户：${address} `)
    const balanceWETH = await contractWeth.balanceOf(address);
    console.log(`余额为:${ethers.utils.formatEther(balanceWETH)}`)

    console.log("\n2. 调用desposit()函数，存入0.0001 ETH")
    const tx = await contractWeth.deposit({value: ethers.utils.parseEther("0.0001")})
    await tx.wait();
    console.log(`交易详情：`)
    console.log(tx)
    const balanceWETH_deposit = await contractWeth.balanceOf(address);
    console.log(`余额为:${ethers.utils.formatEther(balanceWETH_deposit)}`)


    console.log("\n3. 调用transfer()函数，给vitalik转账0.0001 WETH")
    const tx2 = await contractWeth.transfer("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",ethers.utils.parseEther("0.0001"))
    await tx2.wait();
    const balanceWETH_transfer_vitalik= await contractWeth.balanceOf(address);
    console.log(`余额为:${ethers.utils.formatEther(balanceWETH_transfer_vitalik)}`)

}
main();