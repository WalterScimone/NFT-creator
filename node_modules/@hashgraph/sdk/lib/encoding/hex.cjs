"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encode = encode;
exports.decode = decode;

/**
 * @type {string[]}
 */
const byteToHex = [];

for (let n = 0; n <= 0xff; n += 1) {
  byteToHex.push(n.toString(16).padStart(2, "0"));
}
/**
 * @param {Uint8Array} data
 * @returns {string}
 */


function encode(data) {
  return Buffer.from(data).toString("hex");
}
/**
 * @param {string} text
 * @returns {Uint8Array}
 */


function decode(text) {
  const str = text.startsWith("0x") ? text.substring(2) : text;
  return Buffer.from(str, "hex");
}