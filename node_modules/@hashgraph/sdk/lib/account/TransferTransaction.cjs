"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Hbar = _interopRequireDefault(require("../Hbar.cjs"));

var _TokenId = _interopRequireDefault(require("../token/TokenId.cjs"));

var _AccountId = _interopRequireDefault(require("./AccountId.cjs"));

var _Transaction = _interopRequireWildcard(require("../transaction/Transaction.cjs"));

var _long = _interopRequireDefault(require("long"));

var _TokenTransferMap = _interopRequireDefault(require("./TokenTransferMap.cjs"));

var _HbarTransferMap = _interopRequireDefault(require("./HbarTransferMap.cjs"));

var _TokenNftTransferMap = _interopRequireDefault(require("./TokenNftTransferMap.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {import("../long.js").LongObject} LongObject
 * @typedef {import("bignumber.js").default} BigNumber
 */

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 * @typedef {import("@hashgraph/proto").TransactionBody} proto.TransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionBody} proto.ITransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionResponse} proto.ITransactionResponse
 * @typedef {import("@hashgraph/proto").ICryptoTransferTransactionBody} proto.ICryptoTransferTransactionBody
 * @typedef {import("@hashgraph/proto").ITokenID} proto.ITokenID
 * @typedef {import("@hashgraph/proto").IAccountID} proto.IAccountID
 * @typedef {import("@hashgraph/proto").IAccountAmount} proto.IAccountAmount
 * @typedef {import("@hashgraph/proto").ITokenTransferList} proto.ITokenTransferList
 */

/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<*, *>} Client
 * @typedef {import("../transaction/TransactionId.js").default} TransactionId
 */

/**
 * @typedef {object} TransferTokensInput
 * @property {TokenId | string} tokenId
 * @property {AccountId | string} accountId
 * @property {Long | number} amount
 */

/**
 * @typedef {object} TransferTokenObject
 * @property {TokenId} tokenId
 * @property {AccountId} accountId
 * @property {Long} amount
 */

/**
 * @typedef {object} TransferHbarInput
 * @property {AccountId | string} accountId
 * @property {number | string | Long | BigNumber | Hbar} amount
 */

/**
 * @typedef {object} TransferNftInput
 * @property {TokenId | string} tokenId
 * @property {AccountId | string} sender
 * @property {AccountId | string} recipient
 * @property {Long | number} serial
 */

/**
 * Transfers a new Hedera™ crypto-currency token.
 */
class TransferTransaction extends _Transaction.default {
  /**
   * @param {object} [props]
   * @param {(TransferTokensInput)[]} [props.tokenTransfers]
   * @param {(TransferHbarInput)[]} [props.hbarTransfers]
   * @param {(TransferNftInput)[]} [props.nftTransfers]
   */
  constructor(props = {}) {
    super();
    /**
     * @private
     * @type {TokenTransferMap}
     */

    this._tokenTransfers = new _TokenTransferMap.default();
    /**
     * @private
     * @type {HbarTransferMap}
     */

    this._hbarTransfers = new _HbarTransferMap.default();
    /**
     * @private
     * @type {TokenNftTransferMap}
     */

    this._nftTransfers = new _TokenNftTransferMap.default();
    this.setMaxTransactionFee(new _Hbar.default(1));

    for (const transfer of props.tokenTransfers != null ? props.tokenTransfers : []) {
      this.addTokenTransfer(transfer.tokenId, transfer.accountId, transfer.amount);
    }

    for (const transfer of props.hbarTransfers != null ? props.hbarTransfers : []) {
      this.addHbarTransfer(transfer.accountId, transfer.amount);
    }

    for (const transfer of props.nftTransfers != null ? props.nftTransfers : []) {
      this.addNftTransfer(transfer.tokenId, transfer.serial, transfer.sender, transfer.recipient);
    }
  }
  /**
   * @internal
   * @param {proto.ITransaction[]} transactions
   * @param {proto.ISignedTransaction[]} signedTransactions
   * @param {TransactionId[]} transactionIds
   * @param {AccountId[]} nodeIds
   * @param {proto.ITransactionBody[]} bodies
   * @returns {TransferTransaction}
   */


  static _fromProtobuf(transactions, signedTransactions, transactionIds, nodeIds, bodies) {
    const body = bodies[0];
    const cryptoTransfer =
    /** @type {proto.ICryptoTransferTransactionBody} */
    body.cryptoTransfer;
    const transfers = new TransferTransaction();

    for (const list of cryptoTransfer.tokenTransfers != null ? cryptoTransfer.tokenTransfers : []) {
      const tokenId = _TokenId.default._fromProtobuf(
      /** @type {proto.ITokenID} */
      list.token);

      for (const transfer of list.transfers != null ? list.transfers : []) {
        transfers.addTokenTransfer(tokenId, _AccountId.default._fromProtobuf(
        /** @type {proto.IAccountID} */
        transfer.accountID),
        /** @type {Long} */
        transfer.amount);
      }
    }

    const accountAmounts = cryptoTransfer.transfers != null ? cryptoTransfer.transfers.accountAmounts != null ? cryptoTransfer.transfers.accountAmounts : [] : [];

    for (const aa of accountAmounts) {
      transfers.addHbarTransfer(_AccountId.default._fromProtobuf(
      /** @type {proto.IAccountID} */
      aa.accountID), _Hbar.default.fromTinybars(
      /** @type {Long} */
      aa.amount));
    }

    return _Transaction.default._fromProtobufTransactions(transfers, transactions, signedTransactions, transactionIds, nodeIds, bodies);
  }
  /**
   * @returns {TokenTransferMap}
   */


  get tokenTransfers() {
    return this._tokenTransfers;
  }
  /**
   * @param {TokenId | string} tokenId
   * @param {AccountId | string} accountId
   * @param {number | Long} amount
   * @returns {this}
   */


  addTokenTransfer(tokenId, accountId, amount) {
    this._requireNotFrozen();

    this._tokenTransfers.__set(tokenId instanceof _TokenId.default ? tokenId : _TokenId.default.fromString(tokenId), accountId instanceof _AccountId.default ? accountId : _AccountId.default.fromString(accountId), amount instanceof _long.default ? amount : _long.default.fromNumber(amount));

    return this;
  }
  /**
   * @returns {HbarTransferMap}
   */


  get hbarTransfers() {
    return this._hbarTransfers;
  }
  /**
   * @internal
   * @param {AccountId | string} accountId
   * @param {number | string | Long | LongObject | BigNumber | Hbar} amount
   * @returns {TransferTransaction}
   */


  addHbarTransfer(accountId, amount) {
    this._requireNotFrozen();

    this._hbarTransfers._set(accountId instanceof _AccountId.default ? accountId : _AccountId.default.fromString(accountId), amount instanceof _Hbar.default ? amount : new _Hbar.default(amount));

    return this;
  }
  /**
   * @param {Client} client
   */


  _validateChecksums(client) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [a, _] of this._hbarTransfers) {
      if (a != null) {
        a.validateChecksum(client);
      }
    }

    for (const [tokenId, transfers] of this._tokenTransfers) {
      if (tokenId != null) {
        tokenId.validateChecksum(client);
      } // eslint-disable-next-line @typescript-eslint/no-unused-vars


      for (const [a, _] of transfers) {
        if (a != null) {
          a.validateChecksum(client);
        }
      }
    }
  }
  /**
   * @returns {TokenNftTransferMap}
   */


  get nftTransfers() {
    return this._nftTransfers;
  }
  /**
   * @internal
   * @param {TokenId | string} tokenId
   * @param {Long | number} serial
   * @param {AccountId | string} sender
   * @param {AccountId | string} recipient
   * @returns {TransferTransaction}
   */


  addNftTransfer(tokenId, serial, sender, recipient) {
    this._requireNotFrozen();

    this._nftTransfers.__set(typeof tokenId === "string" ? _TokenId.default.fromString(tokenId) : tokenId, {
      serial: typeof serial === "number" ? _long.default.fromNumber(serial) : serial,
      sender: typeof sender === "string" ? _AccountId.default.fromString(sender) : sender,
      recipient: typeof recipient === "string" ? _AccountId.default.fromString(recipient) : recipient
    });

    return this;
  }
  /**
   * @override
   * @internal
   * @param {Channel} channel
   * @param {proto.ITransaction} request
   * @returns {Promise<proto.ITransactionResponse>}
   */


  _execute(channel, request) {
    return channel.crypto.cryptoTransfer(request);
  }
  /**
   * @override
   * @protected
   * @returns {NonNullable<proto.TransactionBody["data"]>}
   */


  _getTransactionDataCase() {
    return "cryptoTransfer";
  }
  /**
   * @override
   * @protected
   * @returns {proto.ICryptoTransferTransactionBody}
   */


  _makeTransactionData() {
    /** @type {proto.ITokenTransferList[]} */
    const tokenTransfers = [];
    const hbarTransfers = [];

    for (const [tokenId, value] of this._tokenTransfers) {
      const transfers = [];

      for (const [accountId, amount] of value) {
        transfers.push({
          accountID: accountId._toProtobuf(),
          amount: amount
        });
      }

      tokenTransfers.push({
        token: tokenId._toProtobuf(),
        transfers
      });
    }

    for (const [tokenId, value] of this._nftTransfers) {
      let found = false; // eslint-disable-next-line ie11/no-loop-func

      const nftTransfers = value.map(transfer => {
        return {
          senderAccountID: transfer.sender._toProtobuf(),
          receiverAccountID: transfer.recipient._toProtobuf(),
          serialNumber: transfer.serial
        };
      });

      for (const tokenTransfer of tokenTransfers) {
        if (tokenTransfer.token != null && tokenTransfer.token.shardNum === tokenId.shard && tokenTransfer.token.realmNum === tokenId.realm && tokenTransfer.token.tokenNum === tokenId.num) {
          tokenTransfer.nftTransfers = nftTransfers;
        }
      }

      if (!found) {
        tokenTransfers.push({
          token: tokenId._toProtobuf(),
          nftTransfers
        });
      }
    }

    for (const [accountId, value] of this._hbarTransfers) {
      hbarTransfers.push({
        accountID: accountId._toProtobuf(),
        amount: value.toTinybars()
      });
    }

    return {
      transfers: {
        accountAmounts: hbarTransfers
      },
      tokenTransfers
    };
  }

}

exports.default = TransferTransaction;

_Transaction.TRANSACTION_REGISTRY.set("cryptoTransfer", // eslint-disable-next-line @typescript-eslint/unbound-method
TransferTransaction._fromProtobuf);