let registerModule : any;

module App.Modules.Register {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const RegisterConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'register/templates/'
        }
        return cons;
    })();

    function RegisterConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, RegisterConstants : IConstants.ModuleConstants) {

        let templatePath = RegisterConstants.templateUrl;

        $stateProvider
            .state('main.register', {
                url: "/SignUp",
                views : {
                    main : {
                        templateUrl: `${templatePath}register.html`,
                        controller : 'RegisterController',
                        controllerAs : 'registerCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'guest',
                        redirectTo : App.Config.Acl.redirects.member
                    },
                    pageTitle : 'PT_SIGN_UP'
                }
            });

    }

    RegisterConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'RegisterConstants' ];

    registerModule = angular.module(`${App.Config.Ng.module.name}.register`, [])
                    .constant('RegisterConstants', RegisterConstants)
                    .config(RegisterConfig);

}