module App.Services.Helpers {

    export class GoogleMapHelpers {

        private address_components : any[];

        private google_address : any;

        setAddressComponents = ( google_address : any ) => {
            this.google_address = google_address;
            if( _.has(google_address, 'address_components') ){
                this.address_components = google_address.address_components;
            } else {
                this.address_components = null;
            }
            return this;
        }

        getAddressComponents = () => {
            return this.address_components;
        }

        getAddressByCategory = ( type : string, defaultMsg : string ) => {
            let addr_position = _.findIndex( this.address_components, ( component : any ) => {
                return _.indexOf( component.types, type ) > -1;
            });
            if(addr_position == -1)
                // return this.address_components[default_index].long_name;
                return defaultMsg;

            return this.address_components[addr_position].long_name;
        }

        getCity = () => {
            return this.getAddressByCategory('postal_town', '');
        }

        getPostalCode = () => {
            return this.getAddressByCategory('postal_code', '');
        }

        getCountry = () => {
            return this.getAddressByCategory('country', '');
        }

        getFullAddressName = () => {
            if(this.address_components){
                return `${this.getPostalCode()} ${this.getCity()}`;
            } else {
                if( _.has(this.google_address, 'formatted_address') && this.google_address ){
                    return `${this.google_address.formatted_address}`;
                } else {
                    return 'No address';
                }
            }
            
        }
    }

    export class HelpersService {

        static $inject : string[] = [ 'AppConstants', '$rootScope', '$location' ];
        
        constructor(
            private AppConstants : App.Main.MainConstants,
            private $rootScope : any,
            private $location
        ){

        }

        gtmSearch = () => {
            window['dataLayer'].push({
                event: 'pageView',
                action: this.$location.url(),
            });

            window['ga']('set', 'page', this.$location.url());
            window['ga']('send', 'pageview', { page : this.$location.url() });
        }

        transformProfilePicture = ( user : any ) => {
            let profile_img = `${this.$rootScope['resource_path']}/default_profile_picture.png`;
            
            if ( _.isEmpty(user.profile_picture )) {
                user.profile_picture = profile_img; 
            } else if(_.startsWith( user.profile_picture, 'users' )){
               user.profile_picture = `${this.AppConstants.baseUrl}/${user.profile_picture}`;
            }

            return user;
        }

        tzDateTime = ( datetime : string ) => {
            return moment.tz(datetime, this.AppConstants.timeZone).clone().tz(this.getTz()).format(this.AppConstants.dateTimeFormat);
        }

        tzDate = ( datetime : string ) => {
            return moment.tz(datetime, this.AppConstants.timeZone).clone().tz(this.getTz()).format(this.AppConstants.dateFormat);
        }

        tzDateTimeStored = ( datetime : string ) => {
            return moment.tz(datetime, this.AppConstants.timeZone).clone().tz(this.getTz()).format(this.AppConstants.dateTimeFormatStore);
        }

        getTz = () => {
            return jstz.determine().name();
        }

        transformUserPicture = (user : App.Repositories.User.UserResponse) => {
            if( _.isEmpty( user.profile_picture ) ){
                user.profile_picture = this.AppConstants.default_profile_picture;
            } else if( user.profile_picture !== this.AppConstants.default_profile_picture && !_.startsWith(user.profile_picture, App.Config.Variables.baseUrl) ){
                if( user.isSocial && _.startsWith( user.profile_picture, 'users' ) ){
                    user.profile_picture = `${App.Config.Variables.baseUrl}/${user.profile_picture}`
                } else if( !user.isSocial && _.startsWith( user.profile_picture, 'users' ) ){
                    user.profile_picture = `${App.Config.Variables.baseUrl}/${user.profile_picture}`
                }
            }   
            return user;
        }

        GoogleMap  : GoogleMapHelpers = new GoogleMapHelpers;
    }

    angularModule.service('HelpersService', HelpersService);
}