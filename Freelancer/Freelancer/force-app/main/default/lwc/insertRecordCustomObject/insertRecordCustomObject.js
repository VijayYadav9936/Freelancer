import { api, LightningElement, track } from 'lwc';

import addDevelopers from '@salesforce/apex/lwcAppExampleApex.addDevelopers';
import SubmitClientAction from '@salesforce/apex/lwcAppExampleApex.SubmitClientAction';
import searchDeveloper from '@salesforce/apex/lwcAppExampleApex.searchDevlopers';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
  { label: 'DeveloperId', fieldName: 'Id' },
  { label: 'Skills', fieldName: 'Skills__c' },
  { label: 'Experience', fieldName: 'Experience__c' }
];

export default class insertRecordCustomObjectLwc extends NavigationMixin(LightningElement) {

  data;
  columns = columns;
  clientId;
  show = false

  @track clientObjName;
  @track clientObjEmail;
  @track clientObjExperience;
  @track clientObjFeedback;
  @track clientObjSkills;
  @track clientObjProjectCost;
  @track clientObjProjectDescription;
  // 
  @track clientRecoreId;

  clientHandleChange(event) {
    if (event.target.name == 'clientName') {
      this.clientObjName = event.target.value;
      //window.console.log('clientObjName ##' + this.clientObjName);
    }
    if (event.target.name == 'clientEmail') {
      this.clientObjEmail = event.target.value;
      //window.console.log('clientObjEmail ##' + this.clientObjEmail);
    }
    if (event.target.name == 'clientExperience') {
      this.clientObjExperience = event.target.value;
    }
    if (event.target.name == 'clientFeedback') {
      this.clientObjFeedback = event.target.value;
    }
    if (event.target.name == 'clientSkills') {
      this.clientObjSkills = event.target.value;
    }
    if (event.target.name == 'clientProjectCost') {
      this.clientObjProjectCost = event.target.value;
    }
    if (event.target.name == 'clientProjectDescription') {
      this.clientObjProjectDescription = event.target.value;
    }
    // 

  }

  submitAction() {
    SubmitClientAction({
      cardName: this.clientObjName, cardEmail: this.clientObjEmail, cardExperience: this.clientObjExperience,
      cardFeedback: this.clientObjFeedback, cardSkills: this.clientObjSkills, cardProjectCost: this.clientObjProjectCost,
      cardProjectDescription: this.clientObjProjectDescription
    })
      // 
      .then(result => {
        console.log('successfully inserted', result);
        this.clientId = result;
        this.getDevelopers();

        // this.clientRecoreId = result.Id;
        // window.console.log('clientRecoreId ' + this.clientRecoreId);       
        // const toastEvent = new ShowToastEvent({
        //     title:'Success!',
        //     message:'Record created successfully',
        //     variant:'success'
        //   });
        //   this.dispatchEvent(toastEvent);

        /*Start Navigation*/
        //   this[NavigationMixin.Navigate]({
        //     type: 'standard__recordPage',
        //     attributes: {
        //         recordId: this.clientRecoreId,
        //         objectApiName: 'Client__c',
        //         actionName: 'view'
        //     },
        //  });
        /*End Navigation*/

      })
      .catch(error => {
        this.errorMsg = error.message;
        window.console.log(this.error);
      });

  }

  getDevelopers() {
    searchDeveloper({ experience: this.clientObjExperience })
      .then(result => {
        console.log('successfully fetched', result);
        this.data = result;
        console.log('successfully fetched data', this.data);

      })
      .catch(error => {
        this.errorMsg = error.message;
        window.console.log(this.error);
      });

  }

  assignDevelopers() {
    var selectedRecords = this.template.querySelector("lightning-datatable").getSelectedRows();
    if (selectedRecords.length > 0) {
      console.log('selectedRecords are ', selectedRecords);

      addDevelopers({ devs: selectedRecords, clientId: this.clientId })
        .then(result => {
          console.log('successfully updated', result);

          /*Start Navigation*/
          this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
              recordId: this.clientId,
              objectApiName: 'Client__c',
              actionName: 'view'
            },
          });
          /*End Navigation*/

        })
        .catch(error => {
          this.errorMsg = error.message;
          window.console.log(this.error);
        });
    }
  }
  showSearch(){
    this.show = true
  }
}