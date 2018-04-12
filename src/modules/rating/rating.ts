let ratingModule : any;

module App.Modules.Rating {
    import Base = App.Base;
    import IConstants = App.Interfaces.Constants;

    const RatingConstants = (() => {
        let cons : IConstants.ModuleConstants = {
            templateUrl : App.Config.Variables.modulesTemplateUrl+'rating/templates/'
        }
        return cons;
    })();

    function RatingConfig($urlRouterProvider : ng.ui.IUrlRouterProvider, $stateProvider : ng.ui.IStateProvider, RatingConstants : IConstants.ModuleConstants) {

        let templatePath = RatingConstants.templateUrl;

        $stateProvider
            .state('main.rating', {
                url: "",
                views : {
                    main : {
                        templateUrl: `${templatePath}rating.html`,
                        controller : 'RatingController',
                        controllerAs : 'ratingCtrl'
                    }
                },
                data : {
                    permissions : {
                        only : 'guest',
                        redirectTo : App.Config.Acl.redirects.member
                    },
                    pageTitle : 'PT_RATING'
                }
            });

    }

    RatingConfig.$inject = [ '$urlRouterProvider', '$stateProvider', 'RatingConstants' ];

    ratingModule = angular.module(`${App.Config.Ng.module.name}.rating`, [])
                    .constant('RatingConstants', RatingConstants)
                    .config(RatingConfig);

}