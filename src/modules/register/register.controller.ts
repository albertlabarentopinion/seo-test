
module App.Modules.Register {
    
    import BaseController = App.Base.BaseController;
    import UserResponse = App.Repositories.User.UserResponse;
    import IApiResponse = App.Interfaces.IApiResponse;

    class RegisterController extends BaseController 
    {
        static $inject = [ '$scope', '$rootScope', 'RegisterService', '$state', 'LoginConstants', 'AppConstants', 'Notifications', 'RequestService', 'LoginService' ];

        user : UserResponse = {};

        private loginSocialTpl : string;

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private RegisterService : App.Modules.Register.RegisterService,
            private $state : any,
            private LoginConstants : App.Modules.Login.LoginConstants,
            private AppConstants : App.Main.MainConstants,
            private Notifications : App.Base.EventDispatcher,
            private RequestService : App.Modules.Request.RequestService,
            private LoginService : App.Modules.Login.Service
        ){
            super( $scope, $rootScope );
            this.defineScope();
        }

        defineScope = () => {
            this.$scope.loginSocialUrl = `${this.AppConstants.apiUrl}/auth/`;
        }

        register = ( user : UserResponse ) => {
            this.user = user;
            return this.RegisterService.register( user ).then( this._handleRegistered.bind( this ), this._handleOnError.bind( this ) );
        }

        _handleRegistered = ( response : IApiResponse ) => {
            this._handleSuccess( response );
            let request = this.RequestService.getRequest();
            if( !_.isEmpty(request) ){
                this.LoginService.loginCustom( this.user.email, this.user['password'] ).then(() => {
                    this.LoginService.welcomePopup(this.user.firstname); 
                    this.LoginService.redirectAuthenticated();
                });
            } else{
                this.Notifications.notify( NOTIFY.REGISTERED );
            }
        }
    }

    registerModule.controller( 'RegisterController', RegisterController );

}