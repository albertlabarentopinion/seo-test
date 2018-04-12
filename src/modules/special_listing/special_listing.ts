let specialListingModule : any;

module App.Modules.SpecialListing {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const SpecialListingConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'special_listing/templates/'
        }
        return cons;
    })();

    function SpecialListingConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, SpecialListingConstants : IConstants.ModuleConstants) {

        let templatePath = SpecialListingConstants.templateUrl;

        $stateProvider
            .state('main.admin.special_listing', {
                url: "/SpecialListings",
                views : {
                    admin : {
                        templateUrl: `${templatePath}special_listing.html`,
                        controller : 'SpecialListingController',
                        controllerAs : 'specialListingCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'admin',
                        redirectTo : App.Config.Acl.redirects.guest
                    },
                    pageTitle : 'PT_SPECIAL_LISTINGS'
                }
            });

    }

    SpecialListingConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'SpecialListingConstants' ];

    specialListingModule = angular.module(`${App.Config.Ng.module.name}.special_listing`, [])
                    .constant('SpecialListingConstants', SpecialListingConstants)
                    .config(SpecialListingConfig);

}