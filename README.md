<h1 id="title">NFT Creator</h1>


<p>A node application that allows you to create and mint Non-Fungible Tokens. Built with Hashgraph SDK to leverage the Hedera Token Service.</p>


<h2>Table of Contents<h2>

* [Installation](#installation)
* [Create Token](#create-token)
* [Mint Token](#mint-token)


<h2 id="installation">Installation</h2>


<p>As prerequisite to run the application, a ProvenDB account is  required, as it will be used as the Blockchain database to store the NFT metadata. Register at https://www.provendb.com/.</br> 
Secondly, you must create a .env file with ACCOUNT_ID and PRIVATE_KEY from a Hedera Testnet account. Register  at https://portal.hedera.com/register.</p>

```sh
ACCOUNT_ID=0.0.XXXXX
PRIVATE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxx
```

<p>Download the repository, then...</p> 

```sh
npm install
```

<h2 id="create-token">Create Token</h2>

<p>Open createToken.js, modify token parameteres at your pleasure...</p>

```sh
//Set parameters to create token...
  let createTokenTx = await new TokenCreateTransaction()
    .setTokenName("Test") <----- change this line
    .setTokenSymbol("TTT") <----- change this line
    .setDecimals(0) 
    .setInitialSupply(0)
    .setSupplyKey(privateKey)
    .setTokenType(TokenType.NonFungibleUnique)
    .setSupplyType(TokenSupplyType.Finite)
    .setMaxSupply(1) <----- change this line (for more than 1 NFT)
    .setTreasuryAccountId(accountId)
    .execute(client);
```

```sh
node createToken
```
<p>After running the command, you should get the token ID in the terminal. Add "0.0." to that number and place it inside the .env file</p>

```sh
ACCOUNT_ID=0.0.XXXXXXX
PRIVATE_KEY=XXXXXXX
TOKEN_ID=0.0.XXXXXXX
```
<h2 id="mint-token">Mint Token</h2>

<p>Go to ProvenDB, upload document to the compliance vault, copy the url from the button "share via URL"</p>

```sh
// Now link the NFT by connecting the PROVENDB file...
  const NFTlink = "https://tinyurl.com/4rm89uuk"; <--- change this
```

```sh
node mintToken
```
<p>You should now have the metadata info in the terminal and this token associated with the file from the URL.</br>
To verify the authenticity of the transaction, please visit https://testnet.dragonglass.me</p>
