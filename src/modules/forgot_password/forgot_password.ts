let forgotPasswordModule : any;

module App.Modules.ForgotPassword {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const ForgotPasswordConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'forgot_password/templates/'
        }
        return cons;
    })();

    function ForgotPasswordConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, ForgotPasswordConstants : IConstants.ModuleConstants) {

        let templatePath = ForgotPasswordConstants.templateUrl;

        $stateProvider
            .state('main.forgot_password', {
                url: "/ForgotPassword",
                views : {
                    main : {
                        templateUrl: `${templatePath}forgot_password.html`,
                        controller : 'ForgotPasswordController',
                        controllerAs : 'forgotPasswordCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'guest',
                        redirectTo : App.Config.Acl.redirects.member
                    },
                    pageTitle : 'PT_FORGOT_PASSWORD'
                }
            })
            .state('main.reset_password', {
                url: "/ResetPassword/:token",
                views : {
                    main : {
                        templateUrl: `${templatePath}reset_password.html`,
                        controller : 'ForgotPasswordController',
                        controllerAs : 'forgotPasswordCtrl'
                    },
                    topnavbar : {
                        templateUrl : `${App.Config.Ng.templates.guest_header}`,
                        controller : 'MainController',
                        controllerAs : 'mainCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'guest',
                        redirectTo : App.Config.Acl.redirects.member
                    },
                    pageTitle : 'PT_RESET_PASSWORD'
                }
            });

    }

    ForgotPasswordConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'ForgotPasswordConstants' ];

    forgotPasswordModule = angular.module(`${App.Config.Ng.module.name}.forgot_password`, [])
                    .constant('ForgotPasswordConstants', ForgotPasswordConstants)
                    .config(ForgotPasswordConfig);

}