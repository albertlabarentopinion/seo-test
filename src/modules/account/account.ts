let accountModule : any;

module App.Modules.Account {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const AccountConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'account/templates/'
        }
        return cons;
    })();

    function AccountConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, AccountConstants : IConstants.ModuleConstants) {

        let templatePath = AccountConstants.templateUrl;

        // Account default to profile
        $urlRouterProvider.when( '/${App.Config.Variables.appAlias}/Account', '/${App.Config.Variables.appAlias}/Account/EditProfile' );
        // $urlRouterProvider.when( '/Account', '/Account/EditProfile' );
        $stateProvider
            .state('main.account', {
                abstract:true,
                url: "/Account",
                views : {
                    main : {
                        templateUrl: `${templatePath}account.html`,
                        controller : 'AccountController',
                        controllerAs : 'accountCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'member',
                        redirectTo : App.Config.Acl.redirects.guest
                    }
                }
            });

    }

    AccountConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'AccountConstants' ];

    accountModule = angular.module(`${App.Config.Ng.module.name}.account`, [])
                    .constant('AccountConstants', AccountConstants)
                    .config(AccountConfig);

}