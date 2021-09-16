/**
 * An public key on the Hedera™ network.
 */
export default class PublicKey extends Key {
    /**
     * @param {Uint8Array} data
     * @returns {PublicKey}
     */
    static fromBytes(data: Uint8Array): PublicKey;
    /**
     * Parse a public key from a string of hexadecimal digits.
     *
     * The public key may optionally be prefixed with
     * the DER header.
     *
     * @param {string} text
     * @returns {PublicKey}
     */
    static fromString(text: string): PublicKey;
    /**
     * @internal
     * @hideconstructor
     * @param {Uint8Array} keyData
     */
    constructor(keyData: Uint8Array);
    /**
     * @type {Uint8Array}
     * @private
     * @readonly
     */
    private readonly _keyData;
    /**
     * Verify a signature on a message with this public key.
     *
     * @param {Uint8Array} message
     * @param {Uint8Array} signature
     * @returns {boolean}
     */
    verify(message: Uint8Array, signature: Uint8Array): boolean;
    /**
     * @param {Transaction} transaction
     * @returns {boolean}
     */
    verifyTransaction(transaction: Transaction): boolean;
    /**
     * @returns {Uint8Array}
     */
    toBytes(): Uint8Array;
    /**
     * @param {PublicKey} other
     * @returns {boolean}
     */
    equals(other: PublicKey): boolean;
}
export type Transaction = import("./PrivateKey.js").Transaction;
import Key from "./Key.js";
