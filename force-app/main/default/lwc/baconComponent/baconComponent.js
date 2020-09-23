import { LightningElement, wire } from 'lwc';

import { fromBinder } from 'c/bigbacon';

import { MessageContext, subscribe, unsubscribe } from 'lightning/messageService';

class LightningElementBacon extends LightningElement {
  baconizeEvent(selector, eventName) {
    return fromBinder((sink) => {
      this.template
        .querySelector(selector)
        .addEventListener(eventName, sink);
    });
  }

  baconMouseMove(selector) {
    return this.baconizeEvent(selector, 'mousemove');
  }

  @wire(MessageContext)
  messageContext;

  // Override me!
  // eslint-disable-next-line class-methods-use-this
  childrenReadyCallback() {
  }

  initialRenderDone = false;

  renderedCallback() {
    if (this.initialRenderDone) {
      return;
    }

    this.initialRenderDone = true;

    this.childrenReadyCallback();
  }

  eventsFromChannel(channelId) {
    return fromBinder((sink) => {
      const subscription = subscribe(
        this.messageContext,
        channelId,
        sink,
      );

      return () => {
        unsubscribe(subscription);
      };
    });
  }

  subscriptionsToClearOnDisconnect = [];

  addUnsubCallback(callback) {
    this.subscriptionsToClearOnDisconnect.push(callback);
  }

  disconnectedCallback() {
    this.subscriptionsToClearOnDisconnect.forEach((unsubCallback) => {
      unsubCallback();
    });
  }
}

module.exports = {
  LightningElementBacon,
}