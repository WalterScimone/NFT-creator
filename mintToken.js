require("dotenv").config();

//Hashgraph SDKs...
const {
  Client,
  AccountId,
  PrivateKey,
  TokenId,
  TokenNftInfoQuery,
  TokenMintTransaction,
  NftId,
} = require("@hashgraph/sdk");

async function main() {
  //Client configuration...
  const privateKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
  const accountId = AccountId.fromString(process.env.ACCOUNT_ID);
  //this is the ID you retrieve running createToken.js first...
  const tokenId = TokenId.fromString(process.env.TOKEN_ID);

  const client = Client.forTestnet();
  client.setOperator(accountId, privateKey);

  // Now link the NFT by connecting the PROVENDB file...
  const NFTlink = "https://tinyurl.com/4rm89uuk";

  const mintTokenTx = await new TokenMintTransaction()
    .setTokenId(tokenId)
    .setMetadata([Buffer.from(NFTlink)])
    .freezeWith(client);

  //Sign with the supply private key of the token...
  const signTx = await mintTokenTx.sign(privateKey);
  //Submit the transaction to Hedera network...
  const txResponse = await signTx.execute(client);
  //Request the receipt of the transaction...
  const receipt = await txResponse.getReceipt(client);
  //Get the NFT serial number...
  const serialNo = receipt.serials[0].toNumber();

  console.log(
    "Minted NFT serial no ",
    serialNo,
    " TokenId ",
    tokenId.num.toNumber()
  );

  // Retrieve the token data
  const nftInfos = await new TokenNftInfoQuery()
    .setNftId(new NftId(tokenId, serialNo))
    .execute(client);

  const metadata = nftInfos[0].metadata.toString();

  console.log("Token Metadata is: ", metadata);
}

main();
