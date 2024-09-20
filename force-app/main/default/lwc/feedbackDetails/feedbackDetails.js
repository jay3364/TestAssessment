import { api, LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendMail from '@salesforce/apex/FeedbackMail.processEmail';

export default class FeedbackDetails extends LightningElement {
    @api recordId;
    @track EmailId;
    @track Category;
    @track Message;
    @track ContactId;

    
    getCategory(event) {
        this.Category = event.target.value;
        console.log('category==>',this.Category);
        
    }

    getMessage(event) {
        this.Message = event.target.value;
        console.log('messgae==>',this.Message);
        
    }

    getContact(event) {
        this.ContactId = event.target.value;
        console.log('contactId==>',this.ContactId);
        
    }

   
    handleSubmit(event) {
        console.log('Submitting the form with fields:', event.detail.fields);
    }

    
    handleSuccess(event) {
      
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Feedback Received Successfully',
                variant: 'success',
            })
        );

        const feedbackRecordId = event.detail.id;
        console.log('Feedback saved with Id:', feedbackRecordId);

        sendMail({
            email: this.EmailId,
            Subject: 'Feedback Received',
            Message: `Category: ${this.Category}\nMessage: ${this.Message}`,
            recordId: this.ContactId
        })
            .then(result => {
                console.log('Email sent successfully:', result);
            })
            .catch(error => {
                console.error('Error sending email:', error);
            });
    }
}
