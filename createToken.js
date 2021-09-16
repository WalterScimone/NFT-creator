require("dotenv").config();

//Hashgraph SDKs...
const {
  Client,
  AccountId,
  PrivateKey,
  TokenCreateTransaction,
  TokenId,
  TokenType,
  TokenSupplyType,
} = require("@hashgraph/sdk");

async function main() {
  //Client configuration...
  const privateKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
  const accountId = AccountId.fromString(process.env.ACCOUNT_ID);

  //setting client for testnet...
  //You can change network with .forPreviewNet or .forMainnet...
  let client = Client.forTestnet();
  client.setOperator(accountId, privateKey);

  //Set parameters to create token...
  let createTokenTx = await new TokenCreateTransaction()
    .setTokenName("JAGABOOKennels")
    .setTokenSymbol("JAGABOO")
    .setDecimals(0)
    .setInitialSupply(0)
    .setSupplyKey(privateKey)
    .setTokenType(TokenType.NonFungibleUnique)
    .setSupplyType(TokenSupplyType.Finite)
    .setMaxSupply(1000)
    .setTreasuryAccountId(accountId)
    .execute(client);

  //Receipt of confirmation...
  let createReceipt = await createTokenTx.getReceipt(client);
  let newTokenId = createReceipt.tokenId;
  console.log("tokenId ", newTokenId);
}

main();
