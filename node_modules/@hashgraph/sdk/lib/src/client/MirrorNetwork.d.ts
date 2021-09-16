/**
 * @typedef {import("../channel/MirrorChannel.js").default} MirrorChannel
 */
/**
 * @typedef {import("./Client.js").NetworkName} NetworkName
 */
export default class MirrorNetwork {
    /**
     * @param {((address: string) => MirrorChannel)?} channelInitFunction
     */
    constructor(channelInitFunction: ((address: string) => MirrorChannel) | null);
    /**
     * Map of node account ID (as a string)
     * to the node URL.
     *
     * @internal
     * @type {string[]}
     */
    network: string[];
    /**
     * Map of node account ID (as a string)
     * to the node URL.
     *
     * @internal
     * @type {Map<string, MirrorNode>}
     */
    networkNodes: Map<string, MirrorNode>;
    index: number;
    /** @type {((address: string) => MirrorChannel)?} */
    _channelInitFunction: ((address: string) => MirrorChannel) | null;
    /**
     * @param {string[]} network
     */
    setMirrorNetwork(network: string[]): void;
    /**
     * @returns {MirrorNode}
     */
    getNextMirrorNode(): MirrorNode;
    close(): void;
}
export type MirrorChannel = import("../channel/MirrorChannel.js").default;
export type NetworkName = import("./Client.js").NetworkName;
import MirrorNode from "../MirrorNode.js";
