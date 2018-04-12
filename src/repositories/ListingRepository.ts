
module App.Repositories.Listing {

    import IRepository = App.Interfaces.Repository;
    import IResponse = App.Interfaces.Response;
    import BaseRepository = App.Base.BaseRepository;

     export interface ListingResponse extends IResponse.IApiResponseElement {
        types? : any;
        size_length? : any;
        size_width? : any;
        size_height? : any;
        access? : string;
        access_text? : string;
        accessibility? : any[];
        accessibility_text? : string;
        own_shared? : string;
        own_shared_text? : string;
        location? : string;
        zip? : string;
        city? : string;
        country? : string;
        latitude? : string;
        longitude? : string;
        location_description? : string;
        heading? : string;
        description? : string;
        accessories? : any[];
        price_per_month? : any;
        no_restrictions_rental_period? : string;
        isDone? : boolean; 
        isActive? : any; 
        user_id? : number;
        other_listing? : string;
        google_address? : any;
        photos? : any[];
        distance_in_km? : number;
        deactivated_by_admin? : number;
        [ param : string ] : any;

        user? : App.Interfaces.User.IUserAuthenticated;
        area? : any;
        requests? : any[];
        isSpecial? : any;
        only_for_listing? : string;
     }

    export class ListingRepository extends BaseRepository {

        static $inject : string[] = ['Restangular', '$q', 'AppConstants', '$rootScope', 'HelpersService'];

        recordName = 'listings';

        controllerName = 'listingsctrl';

        default_id = 'id';

        routes : {
            RESULTS : string,
            LISTING : string,
            DEACTIVATE : string,
            ACTIVATE : string,
        } = {
            RESULTS : 'search-results',
            LISTING : 'search-result-listing',
            DEACTIVATE : 'deactivate',
            ACTIVATE : 'activate'
        }

        constructor(Restangular : restangular.IService, $q : ng.IQService, private AppConstants : App.Main.MainConstants, private $rootScope : any, private HelpersService :App.Services.Helpers.HelpersService ) {
            super(Restangular, $q, 'listings');
        }

        getResults = ( latitude : any, longitude : any , params : any = {}) => {
            params = _.extend( params, { latitude : latitude, longitude : longitude } );
            return this.Restangular.all( `${this.controllerName}/${this.routes.RESULTS}` )
                       .getList( params ).then( this.toResult.bind( this ) );
        }

        getSeoSearchResults = ( placeName : string ) => {
            return this.Restangular.all( `${this.controllerName}/${this.routes.RESULTS}` )
                       .getList( { placeName : placeName } ).then( this.toResult.bind( this ) );
        }

        getListing = ( id : string, params : any ) => {
             return this.Restangular.one( `${this.controllerName}/${this.routes.LISTING}`, id )
                       .get( params ).then( this.toResult.bind( this ) );
        }

        transformer = ( listings : Array<ListingResponse> ) => {
            return _.map( listings, this.transform.bind(this) );
        }

        transform = (listing : ListingResponse) => {
            listing.size_length = (listing.size_length) ? parseInt(listing.size_length ): 0;
            listing.size_width = (listing.size_width) ? parseInt(listing.size_width) : 0;
            listing.size_height = (listing.size_height) ? parseInt(listing.size_height) : 0;
            listing['types_string'] = _.join(listing.types, ', ') ? _.join(listing.types, ', ') : '';
            listing['accessibilty_string'] = _.join(listing.accessibility, ', ') ? _.join(listing.accessibility, ', ') : '';
            listing.area = listing.size_length * listing.size_width;

            if(_.has(listing, 'requests'))
            {
                listing.requests = _.map(listing.requests, (request : any) => {
                    request.updated_at = this.HelpersService.tzDateTimeStored(request.updated_at);
                    return this.HelpersService.transformProfilePicture(request);
                });
            }
            
            let profile_img = `${this.$rootScope['resource_path']}/default_profile_picture.png`;
            if(_.has(listing.user, 'profile_picture')){
                if ( _.isEmpty(listing.user.profile_picture )) {
                    listing.user.profile_picture = profile_img; 
                } else if(_.startsWith( listing.user.profile_picture, 'users' )){
                    listing.user.profile_picture = `${this.AppConstants.baseUrl}/${listing.user.profile_picture}`;
                }
            }
            
            if(_.has(listing, 'user')){
                let username = _.split(listing.user.firstname, ' ');
                listing['user']['username'] = !_.isEmpty(username) ? username[0] : 'No name';
                listing.user.created_at = moment(listing.user.created_at);
            }

            listing.created_at = moment(listing.created_at);
            
            if ( !listing.heading ) listing.heading = 'No name'; 
            if ( !listing.description ) listing.description = 'No description'; 
            
            return listing;
        }

        deactivate = ( id : string ) => {
            return this.Restangular.one( `${this.controllerName}/${this.routes.DEACTIVATE}`, id ).put().then( this.toResult.bind( this ) );
        }

        activate = ( id : string ) => {
            return this.Restangular.one( `${this.controllerName}/${this.routes.ACTIVATE}`, id ).put().then( this.toResult.bind( this ) );
        }
    }

    angularModule.service('Listing', ListingRepository);
}