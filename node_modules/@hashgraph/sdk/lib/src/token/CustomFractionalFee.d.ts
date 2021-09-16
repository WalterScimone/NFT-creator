/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ICustomFee} proto.ICustomFee
 * @typedef {import("@hashgraph/proto").IFractionalFee} proto.IFractionalFee
 * @typedef {import("@hashgraph/proto").IFraction} proto.IFraction
 */
export default class CustomFractionalFee extends CustomFee {
    /**
     * @param {object} props
     * @param {AccountId | string} [props.feeCollectorAccountId]
     * @param {Long | number} [props.numerator]
     * @param {Long | number} [props.denominator]
     * @param {Long | number} [props.min]
     * @param {Long | number} [props.max]
     */
    constructor(props?: {
        feeCollectorAccountId?: string | AccountId | undefined;
        numerator?: number | Long.Long | undefined;
        denominator?: number | Long.Long | undefined;
        min?: number | Long.Long | undefined;
        max?: number | Long.Long | undefined;
    });
    /**
     * @type {?Long}
     */
    _numerator: Long | null;
    /**
     * @type {?Long}
     */
    _denominator: Long | null;
    /**
     * @type {?Long}
     */
    _min: Long | null;
    /**
     * @type {?Long}
     */
    _max: Long | null;
    /**
     * @returns {?Long}
     */
    get numerator(): Long.Long | null;
    /**
     * @param {Long | number} numerator
     * @returns {CustomFractionalFee}
     */
    setNumerator(numerator: Long | number): CustomFractionalFee;
    /**
     * @returns {?Long}
     */
    get denominator(): Long.Long | null;
    /**
     * @param {Long | number} denominator
     * @returns {CustomFractionalFee}
     */
    setDenominator(denominator: Long | number): CustomFractionalFee;
    /**
     * @returns {?Long}
     */
    get min(): Long.Long | null;
    /**
     * @param {Long | number} min
     * @returns {CustomFractionalFee}
     */
    setMin(min: Long | number): CustomFractionalFee;
    /**
     * @returns {?Long}
     */
    get max(): Long.Long | null;
    /**
     * @param {Long | number} max
     * @returns {CustomFractionalFee}
     */
    setMax(max: Long | number): CustomFractionalFee;
}
export namespace proto {
    type ICustomFee = import("@hashgraph/proto").ICustomFee;
    type IFractionalFee = import("@hashgraph/proto").IFractionalFee;
    type IFraction = import("@hashgraph/proto").IFraction;
}
import CustomFee from "./CustomFee.js";
import Long from "long";
import AccountId from "../account/AccountId.js";
