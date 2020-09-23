import { publish, MessageContext } from 'lightning/messageService';
import BEAR_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/BearListUpdate__c';

import { NavigationMixin } from 'lightning/navigation';
import { wire } from 'lwc';
/** BearController.searchBears(searchTerm) Apex method */
import searchBears from '@salesforce/apex/BearController.searchBears';

import * as Bacon from 'c/bigbacon';

import LightningElementBacon from 'c/baconComponent';

export default class BearList extends NavigationMixin(LightningElementBacon) {
    bears;

    bearFetchError;

    loading = true;

    @wire(MessageContext) messageContext;

    childrenReadyCallback() {
      Bacon.fromEvent(this.template.querySelector('lightning-input'), 'change')
        .doAction(() => {
          this.loading = true;
        })
        .map((textChangedEvent) => (textChangedEvent.target.value))
        .debounce(300)
        .startWith('')
        .flatMapLatest((searchInput) => Bacon.fromPromise(searchBears({ searchTerm: searchInput })))
        .doAction((searchResult) => {
          this.bears = searchResult;
          this.loading = false;
        })
        .map((searchResult) => ({ bears: searchResult }))
        .doError((err) => {
          this.bearFetchError = err;
          this.loading = false;
        })
        .onValue((message) => {
          publish(this.messageContext, BEAR_LIST_UPDATE_MESSAGE, message);
        })
        .unsubscribeOnDisconnect(this);
    }

    get showNoResultsMessage() {
      return !this.loading && this.bears.length === 0;
    }

    get bearsAvailable() {
      return !this.loading && this.bears.length > 0;
    }

    handleBearView(event) {
      // Get bear record id from bearview event
      const bearId = event.detail;
      // Navigate to bear record page
      this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
          recordId: bearId,
          objectApiName: 'Bear__c',
          actionName: 'view',
        },
      });
    }
}
