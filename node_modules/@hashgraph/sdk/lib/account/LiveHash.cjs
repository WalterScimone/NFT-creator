"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AccountId = _interopRequireDefault(require("./AccountId.cjs"));

var _cryptography = require("@hashgraph/cryptography");

var _protobuf = require("../cryptography/protobuf.cjs");

var _Duration = _interopRequireDefault(require("../Duration.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").IAccountID} proto.IAccountID
 * @typedef {import("@hashgraph/proto").ILiveHash} proto.ILiveHash
 * @typedef {import("@hashgraph/proto").IDuration} proto.IDuration
 */

/**
 * Response when the client sends the node CryptoGetInfoQuery.
 */
class LiveHash {
  /**
   * @private
   * @param {object} props
   * @param {AccountId} props.accountId
   * @param {Uint8Array} props.hash
   * @param {KeyList} props.keys
   * @param {Duration} props.duration
   */
  constructor(props) {
    /** @readonly */
    this.accountId = props.accountId;
    /** @readonly */

    this.hash = props.hash;
    /** @readonly */

    this.keys = props.keys;
    /** @readonly */

    this.duration = props.duration;
    Object.freeze(this);
  }
  /**
   * @internal
   * @param {proto.ILiveHash} liveHash
   * @returns {LiveHash}
   */


  static _fromProtobuf(liveHash) {
    const liveHash_ =
    /** @type {proto.ILiveHash} */
    liveHash;
    return new LiveHash({
      accountId: _AccountId.default._fromProtobuf(
      /** @type {proto.IAccountID} */
      liveHash_.accountId),
      hash: liveHash_.hash != null ? liveHash_.hash : new Uint8Array(),
      keys: liveHash_.keys != null ? (0, _protobuf.keyListFromProtobuf)(liveHash_.keys) : new _cryptography.KeyList(),
      duration: _Duration.default._fromProtobuf(
      /** @type {proto.IDuration} */
      liveHash_.duration)
    });
  }
  /**
   * @internal
   * @returns {proto.ILiveHash}
   */


  _toProtobuf() {
    return {
      accountId: this.accountId._toProtobuf(),
      hash: this.hash,
      keys: (0, _protobuf.keyListToProtobuf)(this.keys),
      duration: this.duration._toProtobuf()
    };
  }

}

exports.default = LiveHash;