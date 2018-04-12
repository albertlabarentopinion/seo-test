let homeModule : any;

module App.Modules.Home {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const HomeConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'home/templates/'
        }
        return cons;
    })();

    function HomeConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, HomeConstants : IConstants.ModuleConstants ) {

        let templatePath = HomeConstants.templateUrl;

        $stateProvider
            .state('main.home', {
                url: `/`,
                views : {
                    main : {
                        templateUrl: `${templatePath}home.html`,
                        controller : 'HomeController',
                        controllerAs : 'homeCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : ['member', 'guest'],
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_HOME'
                }
            });

    }

    HomeConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'HomeConstants' ];

    homeModule = angular.module(`${App.Config.Ng.module.name}.home`, [])
                    .constant('HomeConstants', HomeConstants)
                    .config(HomeConfig);

}