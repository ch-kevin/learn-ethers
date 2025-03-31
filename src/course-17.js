// 默克尔数

import { ethers } from "ethers";
import {MerkleTree} from "merkletreejs";


const tokens = [
    "0x6a1dD0a16a02A6708BdE76FE866f0d14545Bf4Bb",
    "0xd36cD9c58Fabd23BAb168467FB4574E64C353E41",
    "0x3791601A48Ae2A843cCCfD1f1649920DC2941B5A",
    "0x971a86b4aA12E682f5026aC75F21763bB5F282b0",
]
const main = async ()=>{
    const leaf = tokens.map(x => ethers.utils.keccak256(x))
    const merkletree = new MerkleTree(leaf, ethers.utils.keccak256, { sortPairs: true });

    console.log(merkletree.toString())

    const root = merkletree.getHexRoot();

    console.log("根节点:",root)
    console.log("指定叶子节点:",merkletree.getHexProof(leaf[0]))


    const lo = ethers.utils.keccak256("0x6a1dD0a16a02A6708BdE76FE866f0d14545Bf4Bb")
    const getProof = merkletree.getProof(lo);

    console.log("验证:",merkletree.verify(getProof,lo,root));
    // const leaf = SHA256('a')
    // const proof = tree.getProof(leaf)
    // console.log(tree.verify(proof, leaf, root)) // true
}
main()