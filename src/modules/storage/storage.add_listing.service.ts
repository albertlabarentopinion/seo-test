
module App.Modules.Storage.AddListing {

    import IListingType = App.Repositories.ListingType;
    import IListing = App.Repositories.Listing;

    export class AddListingService {

        static $inject : string[] = [ 'ListingType', '$q', 'Listing', 'AuthService', '$stateParams', 'AppConstants', 'ListingPhoto', 'SpecialAccountService' ];

        listing : App.Repositories.Listing.ListingResponse;

        listing_types : Array<IListingType.ListingTypeResponse> = [];

        users : App.Repositories.User.UserResponse[] = [];

        onReady : any;

        uploadUrl : string;

        isNewListing : boolean = false;

        isUnsaved : boolean = false;

        afterSaveRoute : string; 

        constructor(
            private ListingType : IListingType.ListingTypeRepository,
            private $q : any,
            private Listing : IListing.ListingRepository,
            private AuthService : App.Services.AuthService,
            private $stateParams : any,
            private AppConstants : App.Main.MainConstants,
            private ListingPhoto : App.Repositories.ListingPhoto.ListingPhotoRepository,
            private SpecialAccountService : App.Modules.SpecialAccount.SpecialAccountService
        ){
            this.init();
        }

        init = () => {
            this.uploadUrl = `${this.AppConstants.apiUrl}/${this.Listing.controllerName}/upload-listing-photo`;
            let queue = [
                this.ListingType.getAll().then( this.setListingTypes.bind(this) )
            ];

            this.onReady = this.$q.all(queue);
        }

        setUsers = ( users : App.Repositories.User.UserResponse[] ) => {
            this.users = users;
        }

        getUsers = () => {
            return this.users;
        }

        getListingTypes = () => {
            return _.filter(this.listing_types, ( listing_type : App.Repositories.AdminListing.AdminListingResponse ) => {
                let only_for = _.split( listing_type.only_for_listing, '_' );

                if(this.$stateParams.isSpecial == 1){
                    return _.indexOf( only_for, 'special' ) > -1;
                }

                return _.indexOf( only_for, 'original' ) > -1;
            });
        }

        getListing = ( id : string ) => {
            return this.Listing.find( id, { listing_id : id } ).then( this.setListing.bind( this ) );
        }

        deleteImage = ( id : string ) => {
            return this.ListingPhoto.remove( id );
        }

        setListingTypes = ( listing_types : Array<IListingType.ListingTypeResponse> ) => {
            this.listing_types = listing_types;
        }

        step1 = ( listing : IListing.ListingResponse ) => {
            listing.user_id = listing.isSpecial == 1 ? listing.user.id : this.AuthService.getUser().id;
            return this.save( listing );
        }

        save = ( listing : IListing.ListingResponse ) => {
            listing.user_id = listing.user_id;
            return this.Listing.save( listing ).then( this.setListing.bind( this ) );
        }

        setListing = ( listing : IListing.ListingResponse ) => {
            this.listing = this.transformListing(listing);
            this.listing.photos = this.mapPhotos( listing.photos );
            return this.listing;
        }

        transformListing = ( listing : IListing.ListingResponse ) => {
            listing.other_listing = this.includeOthers( listing.types );
            listing.types = this.transformTypes( listing.types, listing );
            listing.accessibility = this.checkboxTransform( listing.accessibility );
            listing.accessories = this.checkboxTransform( listing.accessories );
            return listing;
        }

        transformTypes = ( types : string[], listing : IListing.ListingResponse ) => {
            if( _.isArray( types ) ){
                types = _.intersection( listing.types, _.map( this.listing_types, 'type' ) );
                types = this.checkboxTransform( listing.types );
            }
            return types;
        }

        includeOthers = ( types : string[] ) => {
            if( !_.isArray( types ) ){
                types = _.keys( types );    
            }

            let ltypes = _.map( this.listing_types, 'type' ); 
            return _.join(_.filter( types, ( type : string ) => {
                return _.indexOf( ltypes, type ) == -1;
            }), ', ');

            return types;
        }

        checkboxTransform = ( keys : string[] ) => {
            if( _.isArray( keys ) ){
                let ndata : any = {};

                _.each( keys, ( key : string ) => {
                    ndata[key] = true; 
                });

                return ndata;
            }   
            return keys;
        }

        mapPhotos = ( photos : any[] ) => {
            let baseUrl = App.Config.Variables.baseUrl; 
            return _.map( photos, ( photo : any ) => {
                return {
                    href : `${baseUrl}/${photo.path}`,
                    thumb : `${baseUrl}/${photo.path}`,
                    id : photo.id
                };
            } );
        }

        acceptTerms = (accept_terms : number) => {
            let user : App.Interfaces.User.User = this.AuthService.getUser();

            if(!_.isEmpty(user)) {
                if(!user.accept_terms){
                    this.AuthService.setUserFields({accept_terms : accept_terms});
                }
            }
        }
    }

    angularModule.service( 'AddListingService', AddListingService );

}