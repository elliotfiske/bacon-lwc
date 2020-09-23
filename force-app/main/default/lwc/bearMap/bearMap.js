import LightningElementBacon from 'c/baconComponent';

import BEAR_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/BearListUpdate__c';

export default class BearMap extends LightningElementBacon {
    mapMarkers = [];

    connectedCallback() {
      this.eventsFromChannel(BEAR_LIST_UPDATE_MESSAGE)
        .map((bearList) => bearList.bears.map((bear) => {
          const Latitude = bear.Location__Latitude__s;
          const Longitude = bear.Location__Longitude__s;

          return {
            location: { Latitude, Longitude },
            title: bear.Name,
            description: `Coords: ${Latitude}, ${Longitude}`,
            icon: 'utility:animal_and_nature',
          };
        }))
        .onValue((markers) => {
          this.mapMarkers = markers;
        })
        .unsubscribeOnDisconnect(this);
    }
}
