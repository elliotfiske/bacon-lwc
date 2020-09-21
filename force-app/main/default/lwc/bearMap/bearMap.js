import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import BEAR_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/BearListUpdate__c';

import bacon from '@salesforce/resourceUrl/Bacon';
import { loadScript } from 'lightning/platformResourceLoader';

export default class BearMap extends LightningElement {
  mapMarkers = [];

  @wire(MessageContext)
  messageContext;

  connectedCallback() {

    var that = this;

    loadScript(this, bacon + '/Bacon.js').then(() => {
        window.Bacon.once('hello!').log();

        window.Bacon.fromBinder(function (sink) {
            let subscription = subscribe(
                that.messageContext,
                BEAR_LIST_UPDATE_MESSAGE,
                sink
            );

            return function () {
                unsubscribe(subscription);
            };
        }).map((message) => {
            console.log("We got a message! " + message);
            debugger;
            return message.bears.map(bear => {
                const Latitude = bear.Location__Latitude__s;
                const Longitude = bear.Location__Longitude__s;
                return {
                    location: { Latitude, Longitude },
                    title: bear.Name,
                    description: `Coords: ${Latitude}, ${Longitude}`,
                    icon: 'utility:animal_and_nature'
                };
            });
        })
        .onValue(markers => {
            debugger;
            that.mapMarkers = markers;
        });
    });
  }
}