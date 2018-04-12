declare let notify : any;
module App.Modules.Login {
    
    import BaseController = App.Base.BaseController;
    import UserResponse = App.Repositories.User.UserResponse;
    import IApiResponse = App.Interfaces.IApiResponse;

    class LoginController extends BaseController 
    {
        static $inject = [ 
            '$scope', 
            '$rootScope', 
            'RegisterService', 
            '$state', 
            '$stateParams', 
            'notify', 
            'LoginConstants', 
            'AppConstants', 
            '$window', 
            'LoginService',
            'toaster'
        ];

        user : UserResponse = {};

        isVerified : boolean = false;

        isExpired : boolean = false;

        appTemplateUrl : string;

        loginSocialTpl : string;

        loginSocialUrl : string;

        loggingIn : boolean = false;

        login : {
            email? : string,
            password? : string,
            remember_me? : boolean
        } = {};

        constructor(
            $scope : ng.IScope,
            $rootScope : ng.IRootScopeService,
            private RegisterService : App.Modules.Register.RegisterService,
            private $state : any,
            private $stateParams : any,
            private notify : any,
            private LoginConstants : LoginConstants,
            private AppConstants : App.Main.MainConstants,
            private $window : any,
            private LoginService : Login.Service,
            private toaster : any
        ){
            super( $scope, $rootScope );
            this.init();
            this.defineScope();
        }
        
        defineScope = () => {
            this.$scope.loginSocialUrl = this.LoginService.loginUrlSocial;
        }

        init = () => {
            this.showLoggingInWithSocial();
            this.setRememberMe();

            switch( this.$stateParams.message ){
                case this.LoginConstants.messages.EMAIL_VERIFIED :
                    this.showEmailVerified();
                    break;
                case this.LoginConstants.messages.EMAIL_VERIFIED_ERROR :
                    this.showEmailVerified( false );
                    break;
                default:
                    return;
            }
        }

        doLogin = ( email : string, password : string, remember_me : boolean ) => {
            return this.LoginService.loginCustom( email, password )
                .then( (  user : App.Interfaces.User.IUserAuthenticated ) => {
                    this.LoginService.welcomePopup(user.firstname); 
                    if( remember_me ){
                        this.LoginService.setRememberMe( email, password );
                    } else {
                        this.LoginService.forgetRememberMe();
                    }
                    this.LoginService.redirectAuthenticated();
                }, ( error : App.Interfaces.IApiResponse ) => {
                    this.errorBags = this.errorTranslate( error );
                });
        }

        private setRememberMe = () => {
            let remember_me = this.LoginService.getRememberMe();

            if( remember_me ){
                this.login.email = remember_me.email;
                this.login.password = remember_me.password;
                this.login.remember_me = true;
            }
        }

        private showLoggingInWithSocial(){
            if( this.$state.current.name == 'main.login.auth_social' ){
                this.loggingIn = true;
                this.LoginService.loginWithSocial( this.$state.params.token ).then( ( msg : any ) => {
                    if( msg == 'error' )
                        this.loggingIn = false;
                    else 
                        this.LoginService.welcomePopup(msg.firstname); 
                } );
            }
        }

        private showEmailVerified = ( success : boolean = true ) => {

            if( success ){
                this.isVerified = true;
            } else {
                this.isExpired = true;
            }

        }

        private showRegistered = () => {
            this.notify({   
                message:'Successfully Registered. Check Your email for verification!',
                classes: 'alert-success',
                position : 'right',
                templateUrl : `${this.$rootScope['mainTemplateUrl']}notify.html`
            });
        }
    }

    loginModule.controller( 'LoginController', LoginController );

}