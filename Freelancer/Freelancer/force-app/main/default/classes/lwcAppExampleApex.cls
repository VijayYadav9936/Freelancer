public class lwcAppExampleApex {

    /*Using multiple parameter in apex  controller */
    @AuraEnabled
    public static id SubmitClientAction(string cardName, string cardEmail, Integer cardExperience,
                                               string cardSkills, Integer cardProjectCost, string cardProjectDescription){
        // 
        Client__c clientObj = new Client__c();
        clientObj.Name=cardName;
        clientObj.Email__c=cardEmail;
        clientObj.Experience__c=cardExperience;
        // clientObj.Feedback__c=cardFeedback;
        clientObj.Skills__c=cardSkills;
        clientObj.Project_Cost__c=cardProjectCost;
        clientObj.Project_Description__c=cardProjectDescription;
        // string cardFeedback,
        insert clientObj;
        return clientObj.id;
    }

    @AuraEnabled
    public static list<Developer__c> searchDevlopers(Integer experience){
        return [SELECT Id, Skills__c, Experience__c FROM Developer__c where Experience__c >=: experience];
    }

    @AuraEnabled
    public static string addDevelopers(list<Developer__c> devs, id clientId){
        System.debug('devs: '+ devs);
        list<Developer__c> developerList = new list<Developer__c>();
        for(Developer__c dev: devs){
            dev.Client__c = clientId;
            developerList.add(dev);
        }
        System.debug('devlist: '+ developerList);
        update developerList;
        return 'developers added';
    }
}