/**
 * @typedef {import("./channel/MirrorChannel.js").default} MirrorChannel
 */
export default class MirrorNode {
    /**
     * @param {string} address
     * @param {(address: string) => MirrorChannel} channelInitFunction
     */
    constructor(address: string, channelInitFunction: (address: string) => MirrorChannel);
    address: string;
    _channelInitFunction: (address: string) => MirrorChannel;
    get channel(): import("./channel/MirrorChannel.js").default;
    _channel: import("./channel/MirrorChannel.js").default | null | undefined;
    close(): void;
}
export type MirrorChannel = import("./channel/MirrorChannel.js").default;
