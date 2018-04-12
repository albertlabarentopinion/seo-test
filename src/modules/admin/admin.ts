let adminModule : any;

module App.Modules.Admin {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const AdminConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'admin/templates/'
        }
        return cons;
    })();

    function AdminConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, AdminConstants : IConstants.ModuleConstants) {

        let templatePath = AdminConstants.templateUrl;

        // Account default to profile
        $urlRouterProvider.when( '/${App.Config.Variables.appAlias}/Admin', '/${App.Config.Variables.appAlias}/Account/Users' );

        $stateProvider
            .state('main.admin', {
                url: "/Admin",
                abstract:true,
                views : {
                    main : {
                        templateUrl: `${templatePath}admin.html`,
                        controller : 'AccountController',
                        controllerAs : 'accountCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'admin',
                        redirectTo : App.Config.Acl.redirects.guest
                    }
                }
            });
    }

    AdminConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'AdminConstants' ];

    adminModule = angular.module(`${App.Config.Ng.module.name}.admin`, [])
                    .constant('AdminConstants', AdminConstants)
                    .config(AdminConfig);

}