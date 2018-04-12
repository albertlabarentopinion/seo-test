module App.Modules.Login {

    export class Service {

        static $inject : string[] = [ 'Restangular', 'LoginConstants', 'AuthService', '$state', '$remember', '$forget', '$base64', 'Notifications', 'toaster', 'AppConstants', 'RequestService' ];

        private email_secret : string = '7ZXYZ@L' ;

        private password_secret : string = 'UU@#90';

        loginUrlSocial : string;

        constructor(
            private Restangular : restangular.IService,
            private LoginConstants : Login.LoginConstants,
            private AuthService : App.Services.AuthService,
            private $state : any,
            private $remember : any,
            private $forget : any,
            private $base64 : any,
            private Notifications : App.Base.EventDispatcher,
            private toaster : any,
            private AppConstants : App.Main.MainConstants,
            private RequestService : App.Modules.Request.RequestService
        )
        {
            this.loginUrlSocial = `${this.AppConstants.apiUrl}/auth/`;
        } 

        loginWithSocial = ( token : string ) => {
            return this.AuthService.loginSocial( token )
                .then( ( user : App.Interfaces.User.IUserAuthenticated ) => {
                    let saved_page = this.AuthService.getSavedPage();
                    if(saved_page){
                        window.location.href  = saved_page;
                    }else {
                        this.redirectAuthenticated();
                    }
                    return user;
                }, () => {
                    this.Notifications.notify( NOTIFY.ERROR_SOCIAL_LOGIN );
                    return 'error';
                });
        }

        loginCustom = ( email : string, password : string ) => {
            return this.AuthService.login( email, password )
                        .then(
                            this.loginCheckProfile.bind(this)
                        );
        }

        loginCheckProfile = ( user : App.Interfaces.User.IUserAuthenticated ) => {
            if( !user.isSocial &&  user.profile_picture == this.AppConstants.default_profile_picture)
            {
                this.Notifications.notify(NOTIFY.UPLOAD_PROFILE);
            } 
            return user;
        }

        redirectAuthenticated = () => {
            let request = this.RequestService.getRequest();
            this.RequestService.isRequestSaved = true;
            if( !_.isEmpty(request) ){
                this.$state.go('main.storage_view', _.extend(request, { requestSaved : 1 }));
            } else{
                this.$state.go( App.Config.Acl.redirects.member );
            }
        }

        setRememberMe = ( email : string, password : string ) => {
             this.$remember( this.email_secret, email );
             this.$remember( this.password_secret , password );
        }

        getRememberMe = () => {


            let email = this.$remember( this.email_secret ),
                password = this.$remember( this.password_secret );

            if( email && password ) {
                // return  {
                //     email :  this.$base64.decode( email+'==' ),
                //     password : this.$base64.decode( password )
                // }
                return  {
                    email :  email,
                    password : password
                }
            }
            return null;
        }

        forgetRememberMe = () => {
            this.$forget( this.email_secret);
            this.$forget( this.password_secret);
        }

        welcomePopup = ( firstname : string ) => {
            this.toaster.pop({
                type: 'success',
                title: 'Login Successful',
                body: `Welcome ${firstname}`,
                showCloseButton: true,
                timeout: 1000
            });
        }

    }

    loginModule.service('LoginService', Service);
}