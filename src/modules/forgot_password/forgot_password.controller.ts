module App.Modules.ForgotPassword {

    import BaseController = App.Base.BaseController;
    import IApiResponse = App.Interfaces.IApiResponse;

    class ForgotPasswordController extends BaseController {

        static $inject : string[] = [ '$scope', '$rootScope', 'AuthService', 'Notifications', '$state', '$stateParams' ];

        token : string;

        constructor
        (
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private AuthService : App.Services.AuthService,
            private Notifications : App.Base.EventDispatcher,
            private $state : any,
            private $stateParams : any
        )
        {
            super( $scope, $rootScope );
            this.init();
        }

        init = () => {
            // reset token
            if( _.has( this.$stateParams, 'token' ) ){
                this.token = this.$stateParams.token;
            }
        }

        forgotPassword = ( email : string ) => {
            return this.AuthService.forgotPassword( email ).then( this.handleSuccess.bind(this), this._handleOnError.bind( this ) );
        }

        resetPassword = ( reset : any ) => {
            reset.token = this.token;
            return this.AuthService.resetPassword( reset ).then( this.handleSuccess.bind(this), this._handleOnError.bind( this ) );
        }

        private handleSuccess = ( resp : App.Interfaces.NotificationData ) => {
            this.$state.go( 'main.login' );
            this.Notifications.notify( resp.notification );
        }
    }

    forgotPasswordModule.controller( 'ForgotPasswordController', ForgotPasswordController );
}