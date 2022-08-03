import { LightningElement, track, api } from "lwc";
import Img002 from '@salesforce/resourceUrl/HomeImg002';
export default class MainContainer extends LightningElement
 {
     Img002logo = Img002;
    @api flexipageRegionWidth;

    //reactive properties for time and greeting
    @track time = "8:22 AM";
    @track greeting = "Good Morning";
    @track day = "Monday";


    connectedCallback() {
        //get current time
        this.getTime();

        //get time periodically after every minute
        setInterval(() => {
            this.getTime();
        }, 1000 * 60);


    }

    /**
     * Get time and parse in human readable format
     * It follows 12 hour format
     */
    getTime() {
        const date = new Date(); /* creating object of Date class */
        const hour = date.getHours();
        const min = date.getMinutes();
        

        this.time = `${this.getHour(hour)}:${this.getDoubleDigit(
            min)} ${this.getMidDay(hour)}`;
        //get greeting (morning/afternoon/evening/)
        this.setGreeting(hour);
    }

    getDay(){
const day = date.getDay();
    }

    //Convert 24 hours format to 12 hours format
    getHour(hour) {
        return hour == 0 ? 12 : hour > 12 ? hour - 12 : hour;
    }

    //convert single digit to double digit
    getDoubleDigit(digit) {
        return digit < 10 ? "0" + digit : digit;
    }

    //return AM or PM based on current hour
    getMidDay(hour) {
        return hour >= 12 ? "PM" : "AM";
    }

    //return greeting based on current hour
    setGreeting(hour) {
        if (hour < 12) {
            this.greeting = "Good Morning";
        } else if (hour >= 12 && hour < 17) {
            this.greeting = "Good Afternoon";
        } else {
            this.greeting = "Good Evening";
        }
    }



}




 //Clock js