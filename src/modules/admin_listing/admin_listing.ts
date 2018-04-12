let adminListingModule : any;

module App.Modules.AdminListing {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const AdminListingConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'admin_listing/templates/'
        }
        return cons;
    })();

    function AdminListingConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, AdminListingConstants : IConstants.ModuleConstants) {

        let templatePath = AdminListingConstants.templateUrl;

        $stateProvider
            .state('main.admin.admin_listing', {
                url: "/Listings",
                views : {
                    "admin" : {
                        templateUrl: `${templatePath}admin_listing.html`,
                        controller : 'AdminListingController',
                        controllerAs : 'adminListingCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'admin',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_MANAGE_LISTING'
                }
            });

    }

    AdminListingConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'AdminListingConstants' ];

    adminListingModule = angular.module(`${App.Config.Ng.module.name}.admin_listing`, [])
                    .constant('AdminListingConstants', AdminListingConstants)
                    .config(AdminListingConfig);

}