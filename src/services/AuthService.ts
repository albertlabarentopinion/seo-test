module App.Services {

    import IUser = App.Interfaces.User;

    export class AuthService {

        static $inject = [ '$sessionStorage', 'AppConstants', 'Auth', '$rootScope', 'HelpersService' ];

        constructor(
           private $sessionStorage : any,
           private AppConstants : App.Main.MainConstants,
           private Auth : App.Repositories.Auth.AuthRepository,
           private $rootScope : ng.IRootScopeService,
           private HelpersService : App.Services.Helpers.HelpersService
        )
        {

        }

        setUser = ( user : IUser.IUserAuthenticated = null ) => {
            if( _.isNull( user ) ){
                user = this.getUser();
            }
            // set default profile 
            user = this.HelpersService.transformUserPicture(user);
            
            // set global user
            this.$rootScope['user'] = user;
            
            // save to session
            this.$sessionStorage.putObject( this.AppConstants.userKey, user );

            // save token to session but not in scope
            if(_.has(user, '_token'))
                this.setToken( user._token );

            delete this.$rootScope['user']._token;

            return user;
        }

        setToken = ( token : string ) => {
            this.$sessionStorage.put( this.AppConstants.userToken, token );
        }

        getUser = () => {
            return this.$sessionStorage.getObject( this.AppConstants.userKey );
        }

        getToken = () => {
            return this.$sessionStorage.get( this.AppConstants.userToken );
        }

        isAuthenticated = () => {
            return !_.isEmpty( this.getUser() );
        }

        isMobileVerified = () => {
            return this.getUser().mobile_verified;
        }

        isEmailVerified = () => {
            return this.getUser().email_verified;
        }

        login = ( email : string, password : string ) => {
            return this.Auth.login( email, password ).then( this.setUser.bind( this ) );
        }

        loginSocial = ( token : string ) => {
            return this.Auth.loginSocial( token ).then( this.setUser.bind( this ) );
        }

        logout = () => {
            this.$sessionStorage.remove( this.AppConstants.userKey );
            this.$sessionStorage.remove( this.AppConstants.userToken );
            this.$sessionStorage.remove( 'onMobileVerification' );
            this.$sessionStorage.remove( 'saved_page' );
            this.$rootScope['user'] = null;
        }

        savePage = (page : string) => {
            this.$sessionStorage.put( 'saved_page', page );
        }

        getSavedPage = () => {
            return this.$sessionStorage.get( 'saved_page' );
        }

        removeSavedPage = () => {
            this.$sessionStorage.remove('saved_page');
        }

        forgotPassword = ( email : string ) => {
            return this.Auth.forgotPassword( email );
        }

        resetPassword = ( reset : any  ) => {
            return this.Auth.resetPassword( reset );
        }

        setUserFields = ( fields : IUser.IUserAuthenticated ) => {
            let user = _.extend( this.getUser(), fields );
            this.setUser( user );
        }

        isAdmin = () => {
            return _.has(this.getUser(), 'role') ? this.getUser().role == this.AppConstants.adminRole : false;
        }

    }

    angularModule.service( 'AuthService', AuthService );
    
}