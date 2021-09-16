"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.read = read;

var _BadKeyError = _interopRequireDefault(require("../BadKeyError.cjs"));

var _pkcs = require("../primitive/pkcs.cjs");

var der = _interopRequireWildcard(require("./der.cjs"));

var base64 = _interopRequireWildcard(require("./base64.cjs"));

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BEGIN_PRIVATEKEY = "-----BEGIN PRIVATE KEY-----\n";
const END_PRIVATEKEY = "-----END PRIVATE KEY-----\n";
const BEGIN_ENCRYPTED_PRIVATEKEY = "-----BEGIN ENCRYPTED PRIVATE KEY-----\n";
const END_ENCRYPTED_PRIVATEKEY = "-----END ENCRYPTED PRIVATE KEY-----\n";
/**
 * @param {string} pem
 * @param {string} [passphrase]
 * @returns {Promise<nacl.SignKeyPair>}
 */

async function read(pem, passphrase) {
  const beginTag = passphrase ? BEGIN_ENCRYPTED_PRIVATEKEY : BEGIN_PRIVATEKEY;
  const endTag = passphrase ? END_ENCRYPTED_PRIVATEKEY : END_PRIVATEKEY;
  const beginIndex = pem.indexOf(beginTag);
  const endIndex = pem.indexOf(endTag);

  if (beginIndex === -1 || endIndex === -1) {
    throw new _BadKeyError.default("failed to find a private key in the PEM file");
  }

  const keyEncoded = pem.slice(beginIndex + beginTag.length, endIndex);
  const key = base64.decode(keyEncoded);

  if (passphrase) {
    let encrypted;

    try {
      encrypted = _pkcs.EncryptedPrivateKeyInfo.parse(key);
    } catch (error) {
      throw new _BadKeyError.default( // eslint-disable-next-line @typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/explicit-module-boundary-types
      `failed to parse encrypted private key: ${error.message}`);
    }

    const decrypted = await encrypted.decrypt(passphrase);

    if (decrypted.algId.algIdent !== "1.3.101.112") {
      throw new _BadKeyError.default(`unknown private key algorithm ${decrypted.algId.toString()}`);
    }

    const keyData = der.decode(decrypted.privateKey);

    if ("bytes" in keyData) {
      return _tweetnacl.default.sign.keyPair.fromSeed(keyData.bytes);
    }

    throw new _BadKeyError.default(`expected ASN bytes, got ${JSON.stringify(keyData)}`);
  }

  return _tweetnacl.default.sign.keyPair.fromSeed(key.subarray(16));
}