"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AccountId = _interopRequireDefault(require("../account/AccountId.cjs"));

var _Timestamp = _interopRequireDefault(require("../Timestamp.cjs"));

var proto = _interopRequireWildcard(require("@hashgraph/proto"));

var _long = _interopRequireDefault(require("long"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The client-generated ID for a transaction.
 *
 * This is used for retrieving receipts and records for a transaction, for appending to a file
 * right after creating it, for instantiating a smart contract with bytecode in a file just created,
 * and internally by the network for detecting when duplicate transactions are submitted.
 */
class TransactionId {
  /**
   * Don't use this method directly.
   * Use `TransactionId.[generate|withNonce|withValidStart]()` instead.
   *
   * @param {?AccountId} accountId
   * @param {?Timestamp} validStart
   * @param {?boolean} scheduled
   */
  constructor(accountId, validStart, scheduled = false) {
    /**
     * The Account ID that paid for this transaction.
     *
     * @readonly
     */
    this.accountId = accountId;
    /**
     * The time from when this transaction is valid.
     *
     * When a transaction is submitted there is additionally a validDuration (defaults to 120s)
     * and together they define a time window that a transaction may be processed in.
     *
     * @readonly
     */

    this.validStart = validStart;
    this.scheduled = scheduled;
    Object.freeze(this);
  }
  /**
   * @param {AccountId} accountId
   * @param {Timestamp} validStart
   * @returns {TransactionId}
   */


  static withValidStart(accountId, validStart) {
    return new TransactionId(accountId, validStart, null);
  }
  /**
   * Generates a new transaction ID for the given account ID.
   *
   * Note that transaction IDs are made of the valid start of the transaction and the account
   * that will be charged the transaction fees for the transaction.
   *
   * @param {AccountId | string} id
   * @returns {TransactionId}
   */


  static generate(id) {
    return new TransactionId(typeof id === "string" ? _AccountId.default.fromString(id) : new _AccountId.default(id), _Timestamp.default.generate());
  }
  /**
   * @param {string} wholeId
   * @returns {TransactionId}
   */


  static fromString(wholeId) {
    let [id, scheduled] = wholeId.split("?");
    const [account, time] = id.split("@");
    const [seconds, nanos] = time.split(".").map(value => _long.default.fromValue(value));
    return new TransactionId(_AccountId.default.fromString(account), new _Timestamp.default(seconds, nanos), scheduled === "scheduled");
  }
  /**
   * @param {boolean} scheduled
   * @returns {this}
   */


  setScheduled(scheduled) {
    this.scheduled = scheduled;
    return this;
  }
  /**
   * @returns {string}
   */


  toString() {
    if (this.accountId != null && this.validStart != null) {
      return `${this.accountId.toString()}@${this.validStart.seconds.toString()}.${this.validStart.nanos.toString()}${this.scheduled ? "?scheduled" : ""}`;
    } else {
      throw new Error("Neither `nonce` or `accountId` and `validStart` are set");
    }
  }
  /**
   * @internal
   * @param {proto.ITransactionID} id
   * @returns {TransactionId}
   */


  static _fromProtobuf(id) {
    if (id.accountID != null && id.transactionValidStart != null) {
      return new TransactionId(_AccountId.default._fromProtobuf(id.accountID), _Timestamp.default._fromProtobuf(id.transactionValidStart), id.scheduled);
    } else {
      throw new Error("Neither `nonce` or `accountID` and `transactionValidStart` are set");
    }
  }
  /**
   * @internal
   * @returns {proto.ITransactionID}
   */


  _toProtobuf() {
    return {
      accountID: this.accountId != null ? this.accountId._toProtobuf() : null,
      transactionValidStart: this.validStart != null ? this.validStart._toProtobuf() : null,
      scheduled: this.scheduled
    };
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {TransactionId}
   */


  static fromBytes(bytes) {
    return TransactionId._fromProtobuf(proto.TransactionID.decode(bytes));
  }
  /**
   * @returns {Uint8Array}
   */


  toBytes() {
    return proto.TransactionID.encode(this._toProtobuf()).finish();
  }
  /**
   * @returns {TransactionId}
   */


  clone() {
    return new TransactionId(this.accountId, this.validStart, this.scheduled);
  }

}

exports.default = TransactionId;