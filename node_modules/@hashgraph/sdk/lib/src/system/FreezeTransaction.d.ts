/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 * @typedef {import("@hashgraph/proto").TransactionBody} proto.TransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionBody} proto.ITransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionResponse} proto.ITransactionResponse
 * @typedef {import("@hashgraph/proto").IFreezeTransactionBody} proto.IFreezeTransactionBody
 */
/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../account/AccountId.js").default} AccountId
 * @typedef {import("../transaction/TransactionId.js").default} TransactionId
 */
/**
 * @typedef {object} HourMinute
 * @property {number} hour
 * @property {number} minute
 */
export default class FreezeTransaction extends Transaction {
    /**
     * @internal
     * @param {proto.ITransaction[]} transactions
     * @param {proto.ISignedTransaction[]} signedTransactions
     * @param {TransactionId[]} transactionIds
     * @param {AccountId[]} nodeIds
     * @param {proto.ITransactionBody[]} bodies
     * @returns {FreezeTransaction}
     */
    static _fromProtobuf(transactions: proto.ITransaction[], signedTransactions: proto.ISignedTransaction[], transactionIds: TransactionId[], nodeIds: AccountId[], bodies: proto.ITransactionBody[]): FreezeTransaction;
    /**
     * @param {Object} [props]
     * @param {HourMinute} [props.startTime]
     * @param {HourMinute} [props.endTime]
     */
    constructor(props?: {
        startTime?: HourMinute | undefined;
        endTime?: HourMinute | undefined;
    } | undefined);
    /**
     * @private
     * @type {?HourMinute}
     */
    private _startTime;
    /**
     * @private
     * @type {?HourMinute}
     */
    private _endTime;
    /**
     * @returns {?HourMinute}
     */
    get startTime(): HourMinute | null;
    /**
     * @param {number | string} startHourOrString
     * @param {?number} startMinute
     * @returns {FreezeTransaction}
     */
    setStartTime(startHourOrString: number | string, startMinute: number | null): FreezeTransaction;
    /**
     * @returns {?HourMinute}
     */
    get endTime(): HourMinute | null;
    /**
     * @param {number | string} endHourOrString
     * @param {?number} endMinute
     * @returns {FreezeTransaction}
     */
    setEndTime(endHourOrString: number | string, endMinute: number | null): FreezeTransaction;
}
export namespace proto {
    type ITransaction = import("@hashgraph/proto").ITransaction;
    type ISignedTransaction = import("@hashgraph/proto").ISignedTransaction;
    type TransactionBody = import("@hashgraph/proto").TransactionBody;
    type ITransactionBody = import("@hashgraph/proto").ITransactionBody;
    type ITransactionResponse = import("@hashgraph/proto").ITransactionResponse;
    type IFreezeTransactionBody = import("@hashgraph/proto").IFreezeTransactionBody;
}
export type Channel = import("../channel/Channel.js").default;
export type AccountId = import("../account/AccountId.js").default;
export type TransactionId = import("../transaction/TransactionId.js").default;
export type HourMinute = {
    hour: number;
    minute: number;
};
import Transaction from "../transaction/Transaction.js";
