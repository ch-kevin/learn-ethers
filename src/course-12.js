import { ethers } from "ethers";

const main  = async () => {
    // 验证 erc 721；
    // 2. 利用ERC165的supportsInterface，确定合约是否为ERC721标准
    // ERC721接口的ERC165 identifier
    const selectorERC721 = "0x80ac58cd"
    const contractERC721 = {};
    const isERC721 = await contractERC721.supportsInterface(selectorERC721)
    console.log("\n2. 利用ERC165的supportsInterface，确定合约是否为ERC721标准")
}

main();