module App.Modules.AdminListing {
    
    export class AdminListingService {

        static $inject : string[] = [ 'AdminListing' ];

        baseUrl : string;
        
        constructor( 
            private AdminListing : App.Repositories.AdminListing.AdminListingRepository
        ){
            this.baseUrl = this.AdminListing.getBaseUrl();
        }

        getListings = () => {
            return this.AdminListing.getAll();
        }

        activateDeactivateListing = ( id : string ) => {
            return this.AdminListing.activateDeactivate(id);
        }

    }

    adminListingModule.service( 'AdminListingService', AdminListingService );
}