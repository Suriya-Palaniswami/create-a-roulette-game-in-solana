console.log("my first node js application");
const web3 = require("@solana/web3.js");
//const { getReturnAmount, totalAmtToBePaid, randomNumber } = require('./helper');
//const {getWalletBalance,transferSOL,airDropSol}=require("./solana");
const connection=new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
//For checking whether the connection is successfully made
console.log(connection);

const userWallet=web3.Keypair.generate();
console.log(userWallet);

//store public and private key
const publicKey = userWallet._keypair.publicKey;
const secretKey = userWallet._keypair.secretKey;

console.log("Public key:"+publicKey.toString());
console.log("secretkey:"+secretKey.toString());


const transferSOL=async (from,to,transferAmt)=>{
    try{
        const connection=new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
        const transaction=new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey:new web3.PublicKey(from.publicKey.toString()),
                toPubkey:new web3.PublicKey(to.publicKey.toString()),
                lamports:transferAmt*web3.LAMPORTS_PER_SOL
            })
        )
        const signature=await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        )
        return signature;
    }catch(err){
        console.log(err);
    }
}

const getWalletBalance=async (pubk)=>{
    try{
        const connection=new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
        const balance=await connection.getBalance(new web3.PublicKey(pubk));
        return balance/web3.LAMPORTS_PER_SOL;
    }catch(err){
        console.log(err);
    }
}