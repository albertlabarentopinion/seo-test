
module App.Modules.Storage {

    import IListingType = App.Repositories.ListingType;
    import IListing = App.Repositories.Listing;

    export class StorageService {

        static $inject : string[] = [ '$q', 'Listing', 'AuthService', 'HelpersService' ];

        listings : Array<IListing.ListingResponse>;

        onReady : any;

        constructor(
            private $q : any,
            private Listing : IListing.ListingRepository,
            private AuthService : App.Services.AuthService,
            private Helpers : App.Services.Helpers.HelpersService
        ){
        }

        reloadListing = () => {
           return this.$q.all([
                this.Listing.getAll({ user_id : this.AuthService.getUser().id }).then( this.setListings.bind(this) )
           ]);
        }

        setListings = (  listings : Array<IListing.ListingResponse> ) => {
            this.listings = listings;
        }

        deleteListing = ( id : string ) => {
            return this.Listing.remove( id );
        }

        deactivateActivateListing = ( id : string, isActive : boolean ) => {
            if( isActive  ){
                return this.Listing.deactivate( id );
            } else {
                return this.Listing.activate( id );
            }
        }
    }

    angularModule.service( 'StorageService', StorageService );

}