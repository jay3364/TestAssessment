import { api, LightningElement, track } from 'lwc';

export default class Feedback extends LightningElement {
    @api flowName = 'Customer_FeedBack';
    @api recordId;
    @api isflow = false;
    handleFeedback(event) {
        console.log('this iis ' + this.recordId);
        console.log(this.flowName);
        this.isflow = true;
        console.log(this.isflow);
        
    }

    // handleStatusChange(event) {
    //     if (event.target.value === 'FINISHED') {
    //         console.log(event.target.value);

    //     }
    // }
}