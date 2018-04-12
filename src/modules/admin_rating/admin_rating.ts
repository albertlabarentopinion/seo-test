let adminRatingModule : any;

module App.Modules.AdminRating {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const AdminRatingConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'admin_rating/templates/'
        }
        return cons;
    })();

    function AdminRatingConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, AdminRatingConstants : IConstants.ModuleConstants) {

        let templatePath = AdminRatingConstants.templateUrl;

        $stateProvider
            .state('main.admin.admin_rating', {
                url: "",
                views : {
                    admin : {
                        templateUrl: `${templatePath}admin_rating.html`,
                        controller : 'AdminRatingController',
                        controllerAs : 'adminRatingCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'admin',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_ADMIN_RATING'
                }
            });

    }

    AdminRatingConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'AdminRatingConstants' ];

    adminRatingModule = angular.module(`${App.Config.Ng.module.name}.admin_rating`, [])
                    .constant('AdminRatingConstants', AdminRatingConstants)
                    .config(AdminRatingConfig);

}