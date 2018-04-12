let specialAccountModule : any;

module App.Modules.SpecialAccount {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const SpecialAccountConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'special_account/templates/'
        }
        return cons;
    })();

    function SpecialAccountConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, SpecialAccountConstants : IConstants.ModuleConstants) {

        let templatePath = SpecialAccountConstants.templateUrl;

        $stateProvider
            .state('main.admin.special_account', {
                url: "/SpecialAccount",
                views : {
                    admin : {
                        templateUrl: `${templatePath}special_account.html`,
                        controller : 'SpecialAccountController',
                        controllerAs : 'specialAccountCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'admin',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_SPECIAL_ACCOUNT'
                }
            });

    }

    SpecialAccountConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'SpecialAccountConstants' ];

    specialAccountModule = angular.module(`${App.Config.Ng.module.name}.special_account`, [])
                    .constant('SpecialAccountConstants', SpecialAccountConstants)
                    .config(SpecialAccountConfig);

}