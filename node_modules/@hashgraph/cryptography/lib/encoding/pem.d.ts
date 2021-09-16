/**
 * @param {string} pem
 * @param {string} [passphrase]
 * @returns {Promise<nacl.SignKeyPair>}
 */
export function read(pem: string, passphrase?: string | undefined): Promise<nacl.SignKeyPair>;
import nacl from "tweetnacl";
