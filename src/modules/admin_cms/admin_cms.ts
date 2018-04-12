let adminCmsModule : any;

module App.Modules.AdminCms {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const AdminCmsConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'admin_cms/templates/'
        }
        return cons;
    })();

    function AdminCmsConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, AdminCmsConstants : IConstants.ModuleConstants) {

        let templatePath = AdminCmsConstants.templateUrl;

        $stateProvider
            .state('main.admin.admin_cms', {
                url: "/ContentManagement",
                views : {
                    "admin" : {
                        templateUrl: `${templatePath}admin_cms.html`,
                        controller : 'AdminCmsController',
                        controllerAs : 'adminCmsCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'admin',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_CONTENT_MANANGEMENT'
                }
            });

    }

    AdminCmsConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'AdminCmsConstants' ];

    adminCmsModule = angular.module(`${App.Config.Ng.module.name}.admin_cms`, [])
                    .constant('AdminCmsConstants', AdminCmsConstants)
                    .config(AdminCmsConfig);

}