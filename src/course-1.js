import { ethers } from "ethers";

const LINEEA_MAINNET = 'https://mainnet.infura.io/v3/00b99ad1cd1448d6b83059081e4f6cdb'
const LINEEA_SEPOLIA = 'https://sepolia.infura.io/v3/00b99ad1cd1448d6b83059081e4f6cdb'
const provider = new ethers.providers.JsonRpcProvider(LINEEA_SEPOLIA)
// const provider = ethers.getDefaultProvider();
const main = async () => {
    const balance = await provider.getBalance(`0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`);
    console.log(`ETH Balance of vitalik: ${ethers.utils.formatEther(balance)} ETH`);

    const network = await provider.getNetwork();
    console.log("network",network);

    const blockNumber = await provider.getBlockNumber();
    console.log("blockNumber",blockNumber);

    const gasPriec = await provider.getGasPrice();
    console.log("gasPriec",gasPriec);

    const feePriec = await provider.getFeeData();
    console.log("feePriec",feePriec);

    const block = await provider.getBlock();
    console.log("block",block[0]);

    const code = await provider.getCode('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
    console.log("code",code);

}
main()

