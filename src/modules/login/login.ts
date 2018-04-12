let loginModule : any;

module App.Modules.Login {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    export interface LoginConstants extends IConstants.ModuleConstants {
        messages : {
            EMAIL_VERIFIED : string,
            REGISTERED : string,
            EMAIL_VERIFIED_ERROR : string
        }
        routes : {
            BEARER_TOKEN : string
        }
        ROUTE_CTRL? : string;
        ROUTE_NAME : string;
    }

    const LoginConstants = (() => {
        let cons : LoginConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'login/templates/',
            messages : {
                EMAIL_VERIFIED : 'email_verified',
                REGISTERED : 'registered' ,
                EMAIL_VERIFIED_ERROR : 'email_verified_error'
            },
            ROUTE_NAME : 'auth',
            routes : {
                BEARER_TOKEN : 'bearer_token'
            }
        }
        return cons;
    })();

    function LoginConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, LoginConstants : LoginConstants ) {

        let templatePath = LoginConstants.templateUrl;

        $stateProvider
            .state('main.login', {
                url: "/login/:message",
                views : {
                    main : {
                        templateUrl: `${templatePath}login.html`,
                        controller : 'LoginController',
                        controllerAs : 'loginCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'guest',
                        redirectTo : App.Config.Acl.redirects.member
                    },
                    pageTitle : 'PT_LOGIN'
                }
            })
            .state('main.login.auth_social', {
                url : "/auth_social/:token",
                controller : 'LoginController',
                controllerAs : 'loginCtrl',
                views : {
                    main : {
                        templateUrl: `${templatePath}login.html`,
                        controller : 'LoginController',
                        controllerAs : 'loginCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'guest',
                        redirectTo : App.Config.Acl.redirects.member
                    },
                    pageTitle : 'PT_LOGIN'
                }
            });

    }

    LoginConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'LoginConstants' ];

    loginModule = angular.module(`${App.Config.Ng.module.name}.login`, [ ])
                    .constant('LoginConstants', LoginConstants)
                    .config(LoginConfig);

}