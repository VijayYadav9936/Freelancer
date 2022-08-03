public class ClientController {

        /*Using multiple parameter in apex  controller */
        @AuraEnabled
        public static Map<String, list<Developer__c>> SubmitClientAction(string name, string email,
                integer experience, string skills){
            Map<String, list<Developer__c>> mapReturn = new Map<String, list<Developer__c>>();
            string requestStatus = 'failure';
            Client__c clientObj = new Client__c();
            clientObj.Name = Name;
            clientObj.Email__c = Email;
            clientObj.Experience__c = experience;
            clientObj.Skills__c = skills;
            
            insert clientObj;
            // call developer method and return developer list line 15
            list<Developer__c> devData = developerList(experience, skills);

            if (devData.size() > 0){
                requestStatus = 'Success';
                mapReturn.put(requestStatus, devData);
            }
            else {
                mapReturn.put(requestStatus, devData);
            }
            return mapReturn;
        }
    
        public static list<Developer__c> developerList(integer experience, string skills){
            return [SELECT Id, Skills__c, Experience__c FROM Developer__c where Skills__c =: skills and Experience__c >=: experience];
        }
    
        // search developer skills and exp with line 12 
    
       // soql 
    }