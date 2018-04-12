

module App.Modules.ContactUs {
    
    export class ContactUsService {

        static $inject : string[] = [ ];
        
        constructor(){}

    }

    contactUsModule.service( 'ContactUsService', ContactUsService );
}