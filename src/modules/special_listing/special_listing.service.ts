module App.Modules.SpecialListing {
    
    export class SpecialListingService {

        static $inject : string[] = [ ];
        
        constructor(){}

    }

    specialListingModule.service( 'SpecialListingService', SpecialListingService );
}