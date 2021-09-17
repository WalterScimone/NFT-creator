<h1 id="title">NFT Creator</h1>


<p>A node application that allows you to create and mint Non-Fungible Tokens. Built with Hashgraph SDK to leverage the Hedera Token Service.</p>


<h2>Table of Contents<h2>

* [Installation](#installation)
* [Sign Up](#signup)
* [Login](#login)
* [Saved Books](#saved-books)
* [Built With](#built)
* [Future Updates](#future)
* [Author](#author)
* [Contributions](#contribute)
* [Give Support](#Support)


<h2 id="installation">Installation</h2>


<p>As prerequisite to run the application, a ProvenDB account is  required, as it will be used as the Blockchain database to store the NFT metadata. Register at https://www.provendb.com/.</br> 
Secondly, you must create a .env file with ACCOUNT_ID and PRIVATE_KEY from a Hedera Testnet account. Register at https://portal.hedera.com/register.</p>

```sh
ACCOUNT_ID=0.0.XXXXX
PRIVATE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxx
```

<p>Download the repository, then...</p> 

```sh
npm install
```

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
