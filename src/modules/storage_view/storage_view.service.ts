

module App.Modules.StorageView {
    
    export class StorageViewService {

        static $inject : string[] = [ 'Listing' ];

        listing : App.Repositories.Listing.ListingResponse;
        
        constructor(
            private Listing : App.Repositories.Listing.ListingRepository
        ){}

        getListing = ( id : string ) => {
            return this.Listing.getListing( id, { listing_id : id } );
        }

        transformListing = ( listing : App.Repositories.Listing.ListingResponse ) => {
            return this.Listing.transform( listing );
        }

    }

    storageViewModule.service( 'StorageViewService', StorageViewService );
}