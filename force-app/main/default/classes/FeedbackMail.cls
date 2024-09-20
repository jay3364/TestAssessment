public with sharing class FeedbackMail {
    @AuraEnabled
    public static String processEmail(String email, String Subject, String Message, String recordId) {
        String sMessage = '';
        try {
           
            List<Contact> contactList = [SELECT Id, Name, Email FROM Contact WHERE Id = :recordId LIMIT 1];
            if (!contactList.isEmpty()) {
                Contact con = contactList[0];
                email = con.Email;
                System.debug('Sending email to: ' + email);
                try {
                    
              
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                mail.setToAddresses(new String[] { email });
                mail.setSubject(Subject);
                mail.setHtmlBody(Message);
                Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });

                sMessage = 'Email sent successfully';
            } catch (Exception e) {
                    System.debug(e);
            }
            } else {
                sMessage = 'No Contact found for the provided Id';
            }
        } catch (Exception ex) {
            sMessage = 'Error: ' + ex.getMessage();
            System.debug('Error sending email: ' + ex);
        }
        return sMessage;
    }
}
