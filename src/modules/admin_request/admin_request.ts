let adminRequestModule : any;

module App.Modules.AdminRequest {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const AdminRequestConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'admin_request/templates/'
        }
        return cons;
    })();

    function AdminRequestConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, AdminRequestConstants : IConstants.ModuleConstants) {

        let templatePath = AdminRequestConstants.templateUrl;

        $stateProvider
            .state('main.admin.admin_request', {
                url: "/Requests",
                views : {
                    "admin" : {
                        templateUrl: `${templatePath}admin_request.html`,
                        controller : 'AdminRequestController',
                        controllerAs : 'adminRequestCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'admin',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_MANAGE_REQUESTS'
                }
            });

    }

    AdminRequestConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'AdminRequestConstants' ];

    adminRequestModule = angular.module(`${App.Config.Ng.module.name}.admin_request`, [])
                    .constant('AdminRequestConstants', AdminRequestConstants)
                    .config(AdminRequestConfig);

}