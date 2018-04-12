let adminUserModule : any;

module App.Modules.AdminUser {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const AdminUserConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'admin_user/templates/'
        }
        return cons;
    })();

    function AdminUserConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, AdminUserConstants : IConstants.ModuleConstants) {

        let templatePath = AdminUserConstants.templateUrl;

        $stateProvider
            .state('main.admin.admin_user', {
                url: "/Users",
                views : {
                    "admin" : {
                        templateUrl: `${templatePath}admin_user.html`,
                        controller : 'AdminUserController',
                        controllerAs : 'adminUserCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'admin',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_MANAGE_USERS'
                }
            });

    }

    AdminUserConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'AdminUserConstants' ];

    adminUserModule = angular.module(`${App.Config.Ng.module.name}.admin_user`, [])
                    .constant('AdminUserConstants', AdminUserConstants)
                    .config(AdminUserConfig);

}