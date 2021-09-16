/**
 * @typedef {import("./account/AccountId.js").default} AccountId
 * @typedef {import("./channel/Channel.js").default} Channel
 * @typedef {import("./channel/MirrorChannel.js").default} MirrorChannel
 */
/**
 * @abstract
 * @template {Channel | MirrorChannel} ChannelT
 */
export default class ManagedNode<ChannelT extends import("./channel/Channel.js").default | import("./channel/MirrorChannel.js").default> {
    /**
     * @param {string} address
     * @param {(address: string) => ChannelT} channelInitFunction
     */
    constructor(address: string, channelInitFunction: (address: string) => ChannelT);
    address: string;
    /** @type {ChannelT | null} */
    _channel: ChannelT | null;
    /** @type {(address: string) => ChannelT} */
    _channelInitFunction: (address: string) => ChannelT;
    get channel(): ChannelT;
    close(): void;
}
export type AccountId = import("./account/AccountId.js").default;
export type Channel = import("./channel/Channel.js").default;
export type MirrorChannel = import("./channel/MirrorChannel.js").default;
