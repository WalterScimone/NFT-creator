/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").IKey} proto.IKey
 * @typedef {import("@hashgraph/proto").IKeyList} proto.IKeyList
 * @typedef {import("@hashgraph/proto").IThresholdKey} proto.IThresholdKey
 */
/**
 * @typedef {import("@hashgraph/cryptography").Key} Key
 */
/**
 * @param {Key} key
 * @returns {proto.IKey}
 */
export function keyToProtobuf(key: Key): import("@hashgraph/proto/lib/proto").proto.IKey;
/**
 * @param {KeyList} list
 * @returns {proto.IKeyList}
 */
export function keyListToProtobuf(list: KeyList): proto.IKeyList;
/**
 * @param {proto.IKey} key
 * @returns {KeyList | PublicKey | ContractId}
 */
export function keyFromProtobuf(key: proto.IKey): KeyList | PublicKey | ContractId;
/**
 * @param {proto.IKeyList} keys
 * @returns {KeyList}
 */
export function keyListFromProtobuf(keys: proto.IKeyList): KeyList;
export namespace proto {
    type IKey = import("@hashgraph/proto").IKey;
    type IKeyList = import("@hashgraph/proto").IKeyList;
    type IThresholdKey = import("@hashgraph/proto").IThresholdKey;
}
export type Key = import("@hashgraph/cryptography").Key;
import { KeyList } from "@hashgraph/cryptography";
import { PublicKey } from "@hashgraph/cryptography";
import ContractId from "../contract/ContractId.js";
