"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @typedef {import("./channel/MirrorChannel.js").default} MirrorChannel
 */
class MirrorNode {
  /**
   * @param {string} address
   * @param {(address: string) => MirrorChannel} channelInitFunction
   */
  constructor(address, channelInitFunction) {
    this.address = address;
    this._channelInitFunction = channelInitFunction;
  }

  get channel() {
    if (this._channel != null) {
      return this._channel;
    }

    this._channel = this._channelInitFunction(this.address);
    return this._channel;
  }

  close() {
    if (this._channel != null) {
      this._channel.close();
    }

    this._channel = null;
  }

}

exports.default = MirrorNode;