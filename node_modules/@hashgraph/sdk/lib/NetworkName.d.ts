/**
 * @param {string} networkName
 * @returns {string}
 */
export function _ledgerIdToLedgerId(networkName: string): string;
/**
 * @param {string} ledgerId
 * @returns {string}
 */
export function _ledgerIdToNetworkName(ledgerId: string): string;
/** @type {[string, string, string]} */
export const _networkIds: [string, string, string];
export default NetworkName;
export type NetworkNameType = {
    Mainnet: string;
    Testnet: string;
    Previewnet: string;
};
/**
 * @typedef {object} NetworkNameType
 * @property {string} Mainnet
 * @property {string} Testnet
 * @property {string} Previewnet
 */
/**
 * @type {NetworkNameType}
 */
declare const NetworkName: NetworkNameType;
